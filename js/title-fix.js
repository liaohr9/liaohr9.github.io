// 修改页面标题，只显示博客名称
document.addEventListener('DOMContentLoaded', function() {
    // 获取当前标题
    var currentTitle = document.title;
    
    // 如果标题包含分隔符，只保留博客名称部分
    var parts = currentTitle.split(' - ');
    // 取最后一部分作为博客名称
    var blogName = parts[parts.length - 1];
    document.title = blogName;
});
