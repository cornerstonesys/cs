/* =========================================================
   The Cornerstone Systems — Small interactive features
   1. Mobile menu
   2. Header shadow + active nav link while scrolling
   3. "Learn More" links pre-select the service in the form
   4. Contact form validation (front-end only, no sending)
   5. Current year in footer
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1. Mobile menu ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");

  function closeMenu() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  toggle.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  // Close the menu after tapping any link inside it
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Close with the Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      closeMenu();
      toggle.focus();
    }
  });

  /* ---------- 2. Header shadow + active nav link ---------- */
  const header = document.querySelector(".site-header");
  const navLinks = document.querySelectorAll(".primary-nav ul a");
  const sections = Array.from(navLinks)
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 10);

    // Find the last section whose top has passed the header
    const offset = header.offsetHeight + 40;
    let currentId = sections[0].id;
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top - offset <= 0) currentId = section.id;
    });

    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 3. "Learn More" → pre-select service ---------- */
  const solutionSelect = document.getElementById("solution");
  document.querySelectorAll("[data-service]").forEach(function (link) {
    link.addEventListener("click", function () {
      solutionSelect.value = link.dataset.service;
    });
  });

  /* ---------- 4. Contact form validation ---------- */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  // Each required field and the message shown if it's not valid
  const rules = [
    { id: "name",     test: function (v) { return v.trim().length > 1; },  msg: "Please enter your name." },
    { id: "email",    test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }, msg: "Please enter a valid email address." },
    { id: "solution", test: function (v) { return v !== ""; },             msg: "Please choose the kind of solution you need." },
    { id: "message",  test: function (v) { return v.trim().length >= 10; }, msg: "Please write a short message (at least 10 characters)." }
  ];

  function validateField(rule) {
    const input = document.getElementById(rule.id);
    const error = document.getElementById(rule.id + "-error");
    const ok = rule.test(input.value);
    input.closest(".field").classList.toggle("invalid", !ok);
    input.setAttribute("aria-invalid", String(!ok));
    if (ok) {
      input.removeAttribute("aria-describedby");
      error.textContent = "";
    } else {
      input.setAttribute("aria-describedby", error.id);
      error.textContent = rule.msg;
    }
    return ok;
  }

  // Re-check a field as soon as the user fixes it
  rules.forEach(function (rule) {
    const input = document.getElementById(rule.id);
    input.addEventListener("blur", function () { if (input.value) validateField(rule); });
    input.addEventListener("input", function () {
      if (input.closest(".field").classList.contains("invalid")) validateField(rule);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // No backend yet, so we never actually submit
    status.className = "form-status";

    let firstInvalid = null;
    rules.forEach(function (rule) {
      if (!validateField(rule) && !firstInvalid) firstInvalid = document.getElementById(rule.id);
    });

    if (firstInvalid) {
      status.textContent = "Please check the highlighted fields.";
      firstInvalid.focus();
      return;
    }

    // Honest message: the form is valid, but nothing was sent.
    status.classList.add("success");
    status.textContent =
      "Thanks! Your details look good, but this form isn't connected to a service yet, so your message was not sent. " +
      "Please call +63 908 618 1068 or message us on Facebook.";

    /*
      TO CONNECT THE FORM LATER:
      Use a form service such as Formspree, Netlify Forms, or Google Forms,
      or your own backend. Replace the message above with a real fetch() call
      to that service, and only show a "sent" message after it succeeds.
    */
  });

  /* ---------- 5. Current year in footer ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
});
