import React, { useState, useMemo, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

ModuleRegistry.registerModules([AllCommunityModule]);

// ── 自訂 Cell Renderers ─────────────────────────────────

const AvatarNameRenderer = ({ value, data }) => {
    const initials = value?.slice(0, 2) ?? '';
    const colors = [
        { bg: '#E6F1FB', text: '#0C447C' },
        { bg: '#EAF3DE', text: '#27500A' },
        { bg: '#EEEDFE', text: '#3C3489' },
        { bg: '#FAEEDA', text: '#633806' },
    ];
    const color = colors[parseInt(data.id.replace('E', '')) % colors.length];
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: color.bg, color: color.text,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 500, flexShrink: 0,
            }}>
                {initials}
            </div>
            {value}
        </div>
    );
};

const StatusRenderer = ({ value }) => {
    const map = {
        active: { label: '在職', bg: '#EAF3DE', color: '#3B6D11' },
        leave: { label: '休假', bg: '#FAEEDA', color: '#854F0B' },
        resigned: { label: '離職', bg: '#FCEBEB', color: '#A32D2D' },
    };
    const s = map[value] ?? { label: value, bg: '#F1EFE8', color: '#5F5E5A' };
    return (
        <span style={{
            padding: '2px 10px', borderRadius: 99,
            background: s.bg, color: s.color,
            fontSize: 11, fontWeight: 500,
        }}>
            {s.label}
        </span>
    );
};

const SalaryRenderer = ({ value }) =>
    <span>NT${Number(value).toLocaleString()}</span>;

const ScoreRenderer = ({ value }) => {
    const color = value >= 90 ? '#3B6D11' : value >= 80 ? '#854F0B' : '#A32D2D';
    return <span style={{ color, fontWeight: 500 }}>{value} 分</span>;
};

const ActionRenderer = ({ data, context }) => (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', height: '100%' }}>
        <button
            onClick={() => context.onEdit(data)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px 6px', borderRadius: 4, fontSize: 13 }}
            title="編輯"
        >✎</button>
        <button
            onClick={() => context.onView(data)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px 6px', borderRadius: 4, fontSize: 13 }}
            title="檢視"
        >⊙</button>
    </div>
);

// ── 統計卡片 ────────────────────────────────────────────

const StatCard = ({ label, value }) => (
    <div style={{
        background: '#f5f5f4', borderRadius: 8, padding: '10px 14px', flex: 1, minWidth: 100,
    }}>
        <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 20, fontWeight: 500 }}>{value}</div>
    </div>
);

// ── 主元件 ──────────────────────────────────────────────

const INITIAL_DATA = [
    { id: 'E001', name: '張小明', dept: '工程部', job: '前端工程師', age: 25, salary: 85000, status: 'active', score: 92 },
    { id: 'E002', name: '李小華', dept: '產品部', job: '產品經理', age: 30, salary: 110000, status: 'active', score: 88 },
    { id: 'E003', name: '王大同', dept: '設計部', job: 'UI 設計師', age: 28, salary: 78000, status: 'active', score: 95 },
    { id: 'E004', name: '趙六', dept: '工程部', job: '後端工程師', age: 35, salary: 98000, status: 'active', score: 85 },
    { id: 'E005', name: '陳美麗', dept: '行銷部', job: '行銷專員', age: 27, salary: 65000, status: 'leave', score: 79 },
    { id: 'E006', name: '林志偉', dept: '工程部', job: 'DevOps 工程師', age: 32, salary: 105000, status: 'active', score: 91 },
    { id: 'E007', name: '吳雅婷', dept: '設計部', job: '視覺設計師', age: 26, salary: 72000, status: 'active', score: 87 },
    { id: 'E008', name: '黃建國', dept: '產品部', job: '產品分析師', age: 33, salary: 88000, status: 'resigned', score: 74 },
    { id: 'E009', name: '劉思穎', dept: '工程部', job: 'QA 工程師', age: 29, salary: 76000, status: 'active', score: 89 },
    { id: 'E010', name: '蔡明哲', dept: '行銷部', job: '內容策略師', age: 31, salary: 70000, status: 'active', score: 83 },
];

const EmployeeGrid = () => {
    const gridRef = useRef(null);
    const [rowData] = useState(INITIAL_DATA);
    const [quickFilter, setQuickFilter] = useState('');
    const [deptFilter, setDeptFilter] = useState('');
    const [displayedCount, setDisplayedCount] = useState(INITIAL_DATA.length);

    // 部門篩選（外部邏輯，isExternalFilterPresent + doesExternalFilterPass）
    const isExternalFilterPresent = useCallback(() => deptFilter !== '', [deptFilter]);
    const doesExternalFilterPass = useCallback(
        (node) => !deptFilter || node.data.dept === deptFilter,
        [deptFilter],
    );

    const colDefs = useMemo(() => [
        {
            field: 'id', headerName: '編號', width: 80,
            cellStyle: { color: '#888', fontVariantNumeric: 'tabular-nums' },
        },
        {
            field: 'name', headerName: '姓名', minWidth: 130,
            cellRenderer: AvatarNameRenderer,
        },
        { field: 'dept', headerName: '部門', minWidth: 100 },
        { field: 'job', headerName: '職位', flex: 1, minWidth: 140 },
        { field: 'age', headerName: '年齡', width: 80, type: 'numericColumn' },
        {
            field: 'salary', headerName: '薪資', width: 130, type: 'numericColumn',
            cellRenderer: SalaryRenderer,
        },
        {
            field: 'score', headerName: '績效', width: 90, type: 'numericColumn',
            cellRenderer: ScoreRenderer,
        },
        {
            field: 'status', headerName: '狀態', width: 90,
            cellRenderer: StatusRenderer,
        },
        {
            field: 'actions', headerName: '操作', width: 90, sortable: false, filter: false,
            cellRenderer: ActionRenderer,
        },
    ], []);

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        resizable: true,
        suppressMovable: false,
    }), []);

    const context = useMemo(() => ({
        onEdit: (data) => alert(`編輯：${data.name}`),
        onView: (data) => alert(`檢視：${data.name}`),
    }), []);

    const onFilterChanged = useCallback(() => {
        setDisplayedCount(gridRef.current?.api?.getDisplayedRowCount() ?? 0);
    }, []);

    // 統計（依目前顯示列計算）
    const stats = useMemo(() => {
        const visible = rowData.filter(r => !deptFilter || r.dept === deptFilter);
        const active = visible.filter(r => r.status === 'active').length;
        const avgAge = visible.length
            ? Math.round(visible.reduce((s, r) => s + r.age, 0) / visible.length) : 0;
        const avgScore = visible.length
            ? Math.round(visible.reduce((s, r) => s + r.score, 0) / visible.length) : 0;
        return { total: visible.length, active, avgAge, avgScore };
    }, [rowData, deptFilter]);

    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', padding: '1rem 0' }}>

            {/* 統計列 */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
                <StatCard label="總人數" value={stats.total} />
                <StatCard label="在職" value={stats.active} />
                <StatCard label="平均年齡" value={`${stats.avgAge} 歲`} />
                <StatCard label="平均績效" value={`${stats.avgScore} 分`} />
            </div>

            {/* 工具列 */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 500, flex: 1 }}>員工名單</span>

                <input
                    type="search"
                    placeholder="搜尋姓名、職位…"
                    value={quickFilter}
                    onChange={e => {
                        setQuickFilter(e.target.value);
                        gridRef.current?.api?.setGridOption('quickFilterText', e.target.value);
                    }}
                    style={{ padding: '6px 10px', border: '1px solid #ddd', borderRadius: 6, fontSize: 13, width: 180 }}
                />

                <select
                    value={deptFilter}
                    onChange={e => setDeptFilter(e.target.value)}
                    style={{ padding: '6px 10px', border: '1px solid #ddd', borderRadius: 6, fontSize: 13 }}
                >
                    <option value="">全部部門</option>
                    {['工程部', '產品部', '設計部', '行銷部'].map(d => (
                        <option key={d}>{d}</option>
                    ))}
                </select>
            </div>

            {/* AG-Grid */}
            <div className="ag-theme-alpine" style={{ height: 420, width: '100%' }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    context={context}
                    isExternalFilterPresent={isExternalFilterPresent}
                    doesExternalFilterPass={doesExternalFilterPass}
                    onFilterChanged={onFilterChanged}
                    pagination
                    paginationPageSize={6}
                    rowHeight={44}
                    headerHeight={40}
                    suppressCellFocus
                    animateRows
                />
            </div>
            <div style={{ marginTop: 6, fontSize: 12, color: '#888', textAlign: 'right' }}>
                顯示 {displayedCount} 筆資料
            </div>
        </div>
    );
};

export default EmployeeGrid;