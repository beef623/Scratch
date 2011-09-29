var timmyo;
var timmyi;
var imgs = new Array();
var zio,zii;
var ie;
var db;
var izi = 0;
var izo = 250;
var zoomspeed = 10;

function init()
{
    ie = document.getElementById('smallzoom');
    zii = document.getElementById('zoomout');
    zio = document.getElementById('zoomin');
    db = document.getElementById('testme');
    
    zii.style.visibility = 'hidden';
    zio.style.visibility = 'hidden';
    
    var ic = ie.children;
    for(var i = 0;i<ic.length;i++)
    {
        ic[i].onmouseover = function()
        {
            ie = window.event.target;
            db.innerText = ie.src;
            zii.src = ie.src;
            izi = 0;
            zii.style.height = izi + 'px';
            zii.style.marginTop = (250 - izi) + 'px';
            zii.style.visibility = 'visible';
            window.clearTimeout(timmyi);
            timmyi = window.setTimeout('startzoom()',10);
        };
        ic[i].onmouseout = function()
        {
            izo = izi;
            zio.src = zii.src;
            zio.style.height = izo + 'px';
            zio.style.visibility = 'visible';
            zii.style.visibility = 'hidden';
            window.clearTimeout(timmyi);
            window.clearTimeout(timmyo);
            timmyo = window.setTimeout('stopzoom()',10);
        };
    }
}

function startzoom()
{
    window.clearTimeout(timmyi);
    izi += 10;
    zii.style.height = izi + 'px';
    zii.style.marginTop = (250 - izi) + 'px';
    if(izi < 250)timmyi = window.setTimeout('startzoom()',100);
}

function stopzoom()
{
    window.clearTimeout(timmyo);
    izo -= 10;
    zio.style.height = izo + 'px';
    zio.style.marginTop = (250 - izo) + 'px';
    if(izo > 0)timmyo = window.setTimeout('stopzoom()',100);
}