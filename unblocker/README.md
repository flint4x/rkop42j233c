<div align="center">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Dongle:wght@300;400;700&display=swap" rel="stylesheet">

<div style="font-family:'Dongle', sans-serif; max-width:700px; margin:auto; color:#eeeeee;">

# m!nimum

<p style="font-size:28px; color:#a0a0a0; font-weight:300;">
m!n·i·mum /ˈminəməm/ noun <br>
the least or smallest amount or quantity of files possible, attainable, or required for a fully functional web proxy.
</p>

---

</div>
</div>

<div style="font-family:'Dongle', sans-serif; max-width:700px; margin:auto;">

## > overview

<p style="font-size:26px; color:#a0a0a0;">
m!nimum is a lightweight, ultra-minimalist web proxy designed for efficiency and speed.  
it provides a fully functional browsing experience with the smallest footprint possible, utilizing scramjet to bypass restrictions while maintaining a sleek, distraction-free interface.
</p>

---

## > core features

<ul style="font-size:26px; color:#a0a0a0; list-style:none; padding-left:10px;">
<li>› <b style="color:#eeeeee;">integrated browser:</b> native multi-tab interface built into a single page.</li>
<li>› <b style="color:#eeeeee;">scramjet engine:</b> high-performance service worker site rewriting.</li>
<li>› <b style="color:#eeeeee;">baremux connectivity:</b> flexible transport handling for wisp servers.</li>
<li>› <b style="color:#eeeeee;">built-in adblocking:</b> pre-configured list of trackers and ad patterns.</li>
<li>› <b style="color:#eeeeee;">dynamic switching:</b> monitors latency and switches to the fastest server.</li>
</ul>

---

## > project structure

<div style="background:#1a1a1a; padding:20px; border-radius:12px; border:1px solid #333; font-size:26px; color:#a0a0a0;">

**index.html** — the primary interface, tabs, and theme engine.  
**sw.js** — proxy logic, adblocking, and wisp pinging.  
**bareworker.js** — bare-mux transport management.

</div>

---

## > usage

<p style="font-size:26px; color:#a0a0a0;">
simply host these three files on any static web server.  
the proxy initializes automatically, allowing you to browse through the "new tab" interface or by entering a URL directly.
</p>

---

<div align="center" style="font-size:22px; color:#444;">
*Credits to me, @scentedcheeseburger on discord for setting me up with the basic proxy, and Claude🥹💀 for bugfixing*
  
</div>

</div>
