const { override, fixBabelImports, addLessLoader } = require('customize-cra');
    module.exports = override(
        fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
        }),

        addLessLoader({
            javascriptEnabled: true,
            modifyVars: {
                '@tabs-ink-bar-color': '#d13c3c', //选中下拉横线
                '@tabs-highlight-color': '#d13c3c',//当前选中的tab字体颜色
                '@tabs-hover-color': '#d13c3c',//鼠标悬停
                // Table
                '@table-header-bg': '#161414', //表头颜色
                '@table-header-color': 'blue',
                '@table-header-sort-bg': '#c20ef7',
                '@table-body-sort-bg': '#12f70e',
                '@table-row-hover-bg': 'rgba(255, 255, 255, 0.075);',//鼠标悬停
                '@table-selected-row-color': '#0ef7e1',
                '@table-selected-row-bg': '#f77d0e',
                '@table-selected-row-hover-bg': '#b2b0ae',
                '@table-footer-bg': '#d13c3c',
                '@table-footer-color': '#ffffff',
                // Pagination
                '@pagination-item-bg-active': '#161414', //分页选项
                // PageHeader
                '@page-header-back-color': 'blue',
            },
        })
    );