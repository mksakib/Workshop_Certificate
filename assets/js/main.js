(function () {
  "use strict";

  /* ---------------- Mobile nav ---------------- */
  var navToggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");
  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- Toast ---------------- */
  var toastEl = document.getElementById("toast");
  var toastTimer = null;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("show");
    }, 3200);
  }

  /* ---------------- Certificate form ---------------- */
  var form = document.getElementById("certForm");
  var nameInput = document.getElementById("participantName");
  var charCount = document.getElementById("charCount");
  var errorEl = document.getElementById("certError");
  var generateBtn = document.getElementById("generateBtn");
  var formCard = document.getElementById("certFormCard");
  var previewWrap = document.getElementById("certPreviewWrap");
  var previewImg = document.getElementById("certPreviewImg");
  var editBtn = document.getElementById("editNameBtn");
  var downloadImgBtn = document.getElementById("downloadImgBtn");
  var downloadPdfBtn = document.getElementById("downloadPdfBtn");

  var currentCanvas = null;
  var currentName = "";

  if (nameInput && charCount) {
    nameInput.addEventListener("input", function () {
      charCount.textContent = nameInput.value.length + "/45";
    });
  }

  function fileBase(name) {
    var clean = name.replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
    return "Certificate-" + (clean || "Participant");
  }

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      var participant = (nameInput.value || "").trim().replace(/\s+/g, " ");
      if (!participant) {
        errorEl.textContent = "Please enter your full name as it should appear on the certificate.";
        return;
      }
      if (participant.length > 45) {
        errorEl.textContent = "Name is too long — please keep it under 45 characters.";
        return;
      }
      errorEl.textContent = "";
      generateBtn.disabled = true;
      generateBtn.textContent = "Generating…";
      try {
        var canvas = await window.AMPHCertificate.renderCertificate(participant);
        currentCanvas = canvas;
        currentName = participant;
        previewImg.src = canvas.toDataURL("image/jpeg", 0.95);
        previewImg.alt = "Certificate of participation for " + participant;
        formCard.style.display = "none";
        previewWrap.style.display = "block";
        previewWrap.scrollIntoView({ behavior: "smooth", block: "center" });
      } catch (err) {
        errorEl.textContent = (err && err.message) || "Something went wrong. Please try again.";
      } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = "Generate my certificate";
      }
    });
  }

  if (editBtn) {
    editBtn.addEventListener("click", function () {
      previewWrap.style.display = "none";
      formCard.style.display = "block";
      formCard.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  if (downloadImgBtn) {
    downloadImgBtn.addEventListener("click", function () {
      if (!currentCanvas) return;
      var a = document.createElement("a");
      a.href = currentCanvas.toDataURL("image/jpeg", 0.95);
      a.download = fileBase(currentName) + ".jpg";
      document.body.appendChild(a);
      a.click();
      a.remove();
      showToast("Certificate image downloaded.");
    });
  }

  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener("click", async function () {
      if (!currentCanvas) return;
      downloadPdfBtn.disabled = true;
      var originalText = downloadPdfBtn.textContent;
      downloadPdfBtn.textContent = "Preparing…";
      try {
        var jsPDFCtor = window.jspdf && window.jspdf.jsPDF;
        if (!jsPDFCtor) throw new Error("PDF library not available.");
        var w = currentCanvas.width;
        var h = currentCanvas.height;
        var pdf = new jsPDFCtor({ orientation: "landscape", unit: "px", format: [w, h] });
        pdf.addImage(currentCanvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, w, h);
        pdf.save(fileBase(currentName) + ".pdf");
        showToast("Certificate PDF downloaded.");
      } catch (err) {
        errorEl.textContent = "Could not build the PDF. Try downloading the image instead.";
      } finally {
        downloadPdfBtn.disabled = false;
        downloadPdfBtn.textContent = originalText;
      }
    });
  }

  /* ---------------- Footer year ---------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
