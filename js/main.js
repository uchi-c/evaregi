/* ==========================================================================
   Evaregi — site interactions
   Sticky nav · mobile menu · animated counters · FAQ · lightbox
   before/after slider · back-to-top · form handling · AOS/Swiper init
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Year in footer ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Sticky navbar ---------- */
  var nav = document.getElementById("navbar");
  var transparentNav = nav && nav.dataset.transparent === "true";
  function onScrollNav() {
    if (!nav) return;
    if (window.scrollY > 40) {
      nav.classList.add("nav-scrolled");
    } else if (transparentNav) {
      nav.classList.remove("nav-scrolled");
    }
  }
  if (nav && transparentNav) {
    window.addEventListener("scroll", onScrollNav, { passive: true });
    onScrollNav();
  }

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("navToggle");
  var mobileMenu = document.getElementById("mobileMenu");
  if (toggle && mobileMenu) {
    toggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("open");
      var icon = toggle.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
      }
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileMenu.classList.remove("open");
        var icon = toggle.querySelector("i");
        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-xmark");
        }
      });
    });
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    var runCounter = function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      var decimals = (target % 1 !== 0) ? 1 : 0;
      var duration = 1600;
      var startTime = null;
      function step(ts) {
        if (!startTime) startTime = ts;
        var progress = Math.min((ts - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = target * eased;
        el.textContent = value.toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toFixed(decimals) + suffix;
      }
      requestAnimationFrame(step);
    };
    var counterObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach(function (c) {
      counterObserver.observe(c);
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.closest(".faq-item");
      var wasOpen = item.classList.contains("open");
      var parent = item.parentElement;
      parent.querySelectorAll(".faq-item.open").forEach(function (i) {
        i.classList.remove("open");
      });
      if (!wasOpen) item.classList.add("open");
    });
  });

  /* ---------- Back to top ---------- */
  var toTop = document.getElementById("toTop");
  if (toTop) {
    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 500) toTop.classList.add("show");
        else toTop.classList.remove("show");
      },
      { passive: true }
    );
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Lightbox gallery ---------- */
  var galleryItems = Array.prototype.slice.call(
    document.querySelectorAll("[data-lightbox]")
  );
  var lightbox = document.getElementById("lightbox");
  if (galleryItems.length && lightbox) {
    var lbImg = lightbox.querySelector("img");
    var current = 0;
    var sources = galleryItems.map(function (i) {
      return i.getAttribute("data-lightbox");
    });
    function show(i) {
      current = (i + sources.length) % sources.length;
      lbImg.setAttribute("src", sources[current]);
    }
    galleryItems.forEach(function (item, i) {
      item.addEventListener("click", function () {
        show(i);
        lightbox.classList.add("open");
        document.body.style.overflow = "hidden";
      });
    });
    function close() {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    }
    lightbox.querySelector(".lightbox-close").addEventListener("click", close);
    lightbox.querySelector(".lightbox-next").addEventListener("click", function (e) {
      e.stopPropagation();
      show(current + 1);
    });
    lightbox.querySelector(".lightbox-prev").addEventListener("click", function (e) {
      e.stopPropagation();
      show(current - 1);
    });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") show(current + 1);
      if (e.key === "ArrowLeft") show(current - 1);
    });
  }

  /* ---------- Before / After slider ---------- */
  document.querySelectorAll(".ba-wrap").forEach(function (wrap) {
    var after = wrap.querySelector(".ba-after");
    var handle = wrap.querySelector(".ba-handle");
    var dragging = false;
    function setPos(clientX) {
      var rect = wrap.getBoundingClientRect();
      var x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      var pct = (x / rect.width) * 100;
      after.style.width = pct + "%";
      handle.style.left = pct + "%";
    }
    function start() { dragging = true; }
    function stop() { dragging = false; }
    function move(e) {
      if (!dragging) return;
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      setPos(clientX);
    }
    handle.addEventListener("mousedown", start);
    handle.addEventListener("touchstart", start, { passive: true });
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move, { passive: true });
    wrap.addEventListener("click", function (e) {
      setPos(e.clientX);
    });
  });

  /* ---------- Contact / Quote form (front-end validation demo) ---------- */
  document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector("[data-form-status]");
      var btn = form.querySelector("button[type=submit]");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (btn) {
        btn.disabled = true;
        btn.dataset.label = btn.innerHTML;
        btn.innerHTML =
          '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending…';
      }
      setTimeout(function () {
        if (status) {
          status.className =
            "mt-4 rounded-lg bg-green-50 border border-green-200 text-green-800 px-4 py-3 text-sm";
          status.innerHTML =
            '<i class="fa-solid fa-circle-check mr-2"></i>Thank you! Your message has been received. Our team will contact you shortly.';
          status.classList.remove("hidden");
        }
        form.reset();
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = btn.dataset.label;
        }
      }, 1200);
    });
  });

  /* ---------- Init AOS ---------- */
  if (window.AOS) {
    AOS.init({
      once: true,
      duration: 700,
      offset: 90,
      easing: "ease-out-cubic",
      disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }

  /* ---------- Init Swiper (testimonials) ---------- */
  if (window.Swiper && document.querySelector(".testimonial-swiper")) {
    new Swiper(".testimonial-swiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: ".testimonial-swiper .swiper-pagination", clickable: true },
      breakpoints: {
        768: { slidesPerView: 2 },
        1100: { slidesPerView: 3 },
      },
    });
  }

  /* ---------- Init Swiper (projects showcase) ---------- */
  if (window.Swiper && document.querySelector(".project-swiper")) {
    new Swiper(".project-swiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 4200, disableOnInteraction: false },
      pagination: { el: ".project-swiper .swiper-pagination", clickable: true },
      navigation: {
        nextEl: ".project-swiper .swiper-button-next",
        prevEl: ".project-swiper .swiper-button-prev",
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }
})();
