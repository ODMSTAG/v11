function live() {
  var bgUrl = localStorage.getItem('bgUrl');
  var selectedTheme = localStorage.getItem('selectedOption');
  var containers = document.querySelectorAll('div:not(#particles-js):not(#settingsContainer):not(#contextItem):not(#contextMenu):not(#cloak):not(#menu):not(#sidebar):not(.themesExcluded), .tabBtn');

  function applyTheme(bgColor, bgImageOrGradient) {
    containers.forEach(container => container.style.backgroundColor = bgColor);
    document.body.style.background = bgImageOrGradient;
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.height = "100%";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  }

  if (bgUrl === null || bgUrl === 'none' || bgUrl === '') {
    switch (selectedTheme) {
      case 'japanesematrix':
        applyTheme('rgba(0, 0, 0, 0.8)', 'none'); // Set a default color, background will be handled by the canvas
        initializeMatrixEffect();
        break;
      case 'deepsea':
        applyTheme('rgba(19, 34, 48, 0.8)', "linear-gradient(to bottom right, rgb(16, 52, 82), rgb(9, 34, 55), black)");
        break;
      case 'equinox':
        applyTheme('rgb(24 24 24 / 32%)', "url('/assets/img/equinox.webp')");
        document.querySelectorAll('input').forEach(inputElement => {
          inputElement.style.transition = '.2s';
          inputElement.style.backgroundColor = 'rgba(15, 15, 15, 0.89)';
          inputElement.style.boxShadow = '0 0 1px rgba(255, 255, 255, 0.267)';
          inputElement.style.opacity = '100%';
        });
        break;
      // Other cases...
      default:
        applyTheme('rgba(0, 0, 0, 0.8)', 'none');
        initializeMatrixEffect();
    }
  }

  function initializeMatrixEffect() {
    var canvas = document.createElement("canvas");
    canvas.id = "matrix-canvas";
    document.body.appendChild(canvas);
    
    var root = {
      wavecolor: {  
        r: 125,
        g: 52,
        b: 253
      },
      rainbowSpeed: 0.5,
      rainbow: true,
      matrixspeed: 50
    };

    var c = document.getElementById("matrix-canvas");
    var ctx = c.getContext("2d");

    var hueFw = false;
    var hue = -0.01;

    c.height = window.innerHeight;
    c.width = window.innerWidth;

    var konkani = "゠アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレワヰヱヲンヺ・ーヽヿ0123456789";
    var characters = konkani.split("");
    var font_size = 14;
    var columns = c.width / font_size;
    var gradient = ctx.createLinearGradient(0, 10, 0, 200);
    var drops = [];
    for (var x = 0; x < columns; x++)
      drops[x] = 1;

    function draw() {
      ctx.fillStyle = "rgba(0,0,0, 0.05)";
      ctx.fillRect(0, 0, c.width, c.height);

      ctx.fillStyle = "#BBB";
      ctx.font = font_size + "px arial";

      for (var i = 0; i < drops.length; i++) {
        ctx.fillStyle = "rgba(10,10,10, 1)";
        ctx.fillRect(i * font_size, drops[i] * font_size, font_size, font_size);
        var text = characters[Math.floor(Math.random() * characters.length)];

        if (root.rainbow) {
          hue += (hueFw) ? 0.01 : -0.01;
          var rr = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 0) + 128);
          var rg = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 2) + 128);
          var rb = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 4) + 128);
          ctx.fillStyle = 'rgba(' + rr + ',' + rg + ',' + rb + ')';
        } else {
          ctx.fillStyle = 'rgba(' + root.wavecolor.r + ',' + root.wavecolor.g + ',' + root.wavecolor.b + ')';
        }

        ctx.fillText(text, i * font_size, drops[i] * font_size);
        drops[i]++;
        if (drops[i] * font_size > c.height && Math.random() > 0.975)
          drops[i] = 0;
      }
    }

    window.onresize = () => {
      location.reload();
    }

    setInterval(draw, root.matrixspeed);

    function livelyPropertyListener(name, val) {
      switch (name) {
        case "matrixColor":
          root.wavecolor = hexToRgb(val);
          break;
        case "rainBow":
          root.rainbow = val;
          break;   
        case "rainbowSpeed":
          root.rainbowSpeed = val / 100;
          break;     
      }
    }

    function hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
  }

  /* Ripple Effect for buttons */
  [].map.call(document.querySelectorAll('[anim="ripple"]'), el => {
    el.addEventListener('mousedown', e => {
      e = e.touches ? e.touches[0] : e;
      const r = el.getBoundingClientRect(),
        d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2;
      el.style.cssText = `--s: 0; --o: 1;`;
      el.offsetTop;
      el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${e.clientX - r.left}; --y:${e.clientY - r.top};`
      if (el.classList.contains('90px')) {
        el.style.width = '90px';
      }
    })
  });

  /* Background Check */
  document.addEventListener('DOMContentLoaded', function() {
    if (bgUrl === 'none' || bgUrl === null || bgUrl === '') {
      console.log('[❌] Custom Background');
    } else {
      document.body.style.backgroundImage = `url(${bgUrl})`;
      document.getElementById('particles-js').remove();
      console.log('[✔️] Custom Background');
    }
  });

  console.log('[✔️] Themes Loaded');
}

live();
