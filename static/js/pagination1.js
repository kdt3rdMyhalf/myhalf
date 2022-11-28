var pagePagination = {
    code : '',
    Extend : function(data) {
    data = data || {};
    pagePagination.size = data.size || 300;
    pagePagination.page = data.page || 1;
    pagePagination.step = data.step || 3;
    },
    Add : function(p, q) {
    for (var l =p;l < q; l++) {
    pagePagination.code += '<a>' + l + '</a>';
    }
    },
    Last : function() {
    pagePagination.code += '<i>...</i><a>' + pagePagination.size + '</a>';
    },
    First : function() {
    pagePagination.code += '<a>1</a><i>...</i>';
    },
    Click : function() {
    pagePagination.page = +this.innerHTML;
    pagePagination.Start();
    },
    Prev : function() {
    pagePagination.page--;
    if (pagePagination.page < 1) {
    pagePagination.page = 1;
    }
    pagePagination.Start();
    },
    Next : function() {
    pagePagination.page++;
    if (pagePagination.page > pagePagination.size) {
    pagePagination.page = pagePagination.size;
    }
    pagePagination.Start();
    },
    Bind : function() {
    var a = pagePagination.e.getElementsByTagName('a');
    for (var num = 0; num < a.length; num++) {
    if (+a[num].innerHTML === pagePagination.page)
    a[num].className = 'current';
    a[num].addEventListener('click', pagePagination.Click, false);
    }
    },
    Finish : function() {
    pagePagination.e.innerHTML = pagePagination.code;
    pagePagination.code = '';
    pagePagination.Bind();
    },
    Start : function() {
    if (pagePagination.size < pagePagination.step * 2 + 6) {
    pagePagination.Add(1, pagePagination.size + 1);
    } else if (pagePagination.page < pagePagination.step * 2 + 1) {
    pagePagination.Add(1, pagePagination.step * 2 + 4);
    pagePagination.Last();
    } else if (pagePagination.page > pagePagination.size - pagePagination.step * 2) {
    pagePagination.First();
    pagePagination.Add(pagePagination.size - pagePagination.step * 2 - 2,
    pagePagination.size + 1);
    } else {
    pagePagination.First();
    pagePagination.Add(pagePagination.page - pagePagination.step,
    pagePagination.page + pagePagination.step + 1);
    pagePagination.Last();
    }
    pagePagination.Finish();
    },
    Buttons : function(e) {
    var nav = e.getElementsByTagName('a');
    nav[0].addEventListener('click', pagePagination.Prev, false);
    nav[1].addEventListener('click', pagePagination.Next, false);
    },
    Create : function(e) {
    var html = [ '<a>◄</a>', // previous button
    '<span></span>', // paginationID container
    '<a>►</a>' // next button
    ];
    e.innerHTML = html.join('');
    pagePagination.e = e.getElementsByTagName('span')[0];
    pagePagination.Buttons(e);
    },
    Init : function(e, data) {
    pagePagination.Extend(data);
    pagePagination.Create(e);
    pagePagination.Start();
    }
    };
    var init = function() {
    pagePagination.Init(document.getElementById('paginationID'), {
    size : 30,
    page : 1,
    step : 3
    });
    };
    document.addEventListener('DOMContentLoaded', init, false);