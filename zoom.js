var timmyo;//timer for zooming out
var timmyi;//timer for zooming in
var zio,zii;//the images at the top that actually change size
var iei,ieo;//a placeholder for the image being zoomed in and zoomed out
var maxsize;//how much space do we have to work with
var izi = 0;//size of image zooming in
var izo = 250;//size of image zooming out
var zoomspeed = 10;//ms pause between zoom steps
var scratch;

function init()
{
    //grab the thumbnail container and 2 zooming images
    var ie = document.getElementById('smallzoom');
    zii = document.getElementById('zoomout');
    zio = document.getElementById('zoomin');
    
    //hide the 2 zooming images for now
    zii.style.visibility = 'hidden';
    zio.style.visibility = 'hidden';
    
    maxsize = zii.parentElement.offsetHeight;
    
    //put all of the thumbnails into an array then loop through the array to set the onmouse... events
    var ic = ie.children;
    for(var i = 0;i<ic.length;i++)
    {
        ic[i].onmouseover = function()
        {
            //get the target element of the event
            iei = window.event.target;
            
            //set the image source of the image zooming in the the same as the thumbnail
            zii.src = iei.src;
            
            //reset the zoom in image size
            izi = 0;
            zii.style.height = izi + 'px';
            
            //setting the bottom value of the style wasn't working so offset from the top instead
            zii.style.marginTop = (maxsize - izi) + 'px';
            
            //get the offset based on the current size of the images
            scratch = iei.offsetLeft - iei.parentElement.offsetLeft - (zii.offsetWidth / 2) + (iei.offsetWidth / 2);
            zii.style.marginLeft = scratch<0?0:scratch + 'px';
            
            //show the image and start the zoom
            zii.style.visibility = 'visible';
            window.clearTimeout(timmyi);
            timmyi = window.setTimeout('startzoom()',zoomspeed);
        };
        ic[i].onmouseout = function()
        {
            //this process is basically the same as the above except it is using the current zoom in image instead of an event target
            ieo = iei;
            izo = izi;
            zio.src = zii.src;
            zio.style.height = izo + 'px';
            scratch = ieo.offsetLeft - ieo.parentElement.offsetLeft - (zio.offsetWidth / 2) + (ieo.offsetWidth / 2);
            zio.style.marginLeft = scratch<0?0:scratch + 'px';
            zio.style.visibility = 'visible';
            zii.style.visibility = 'hidden';
            window.clearTimeout(timmyi);
            window.clearTimeout(timmyo);
            timmyo = window.setTimeout('stopzoom()',zoomspeed);
        };
    }
}

//the zoom functions just update the size and offset of the images and call themselves until full size is reached
function startzoom()
{
    window.clearTimeout(timmyi);
    izi += 10;
    zii.style.height = izi + 'px';
    zii.style.marginTop = (maxsize - izi) + 'px';
    scratch = iei.offsetLeft - iei.parentElement.offsetLeft - (zii.offsetWidth / 2) + (iei.offsetWidth / 2);
            zii.style.marginLeft = scratch<0?0:scratch + 'px';
    if(izi < maxsize)timmyi = window.setTimeout('startzoom()',zoomspeed);
}

function stopzoom()
{
    window.clearTimeout(timmyo);
    izo -= 10;
    zio.style.height = izo + 'px';
    zio.style.marginTop = (maxsize - izo) + 'px';
    scratch = ieo.offsetLeft - ieo.parentElement.offsetLeft - (zio.offsetWidth / 2) + (ieo.offsetWidth / 2);
            zio.style.marginLeft = scratch<0?0:scratch + 'px';
    if(izo > 0)timmyo = window.setTimeout('stopzoom()',zoomspeed);
}