var main = document.getElementById("main");
main.addEventListener("mouseenter", function(event) {
    document.documentElement.style.setProperty("--grad-1", "#12733C");
    document.documentElement.style.setProperty("--grad-2", "#4C1273");
});
main.addEventListener("mouseleave", function(event) {
    document.documentElement.style.setProperty("--grad-1", "#4C1273");
    document.documentElement.style.setProperty("--grad-2", "#12733C");
});

var projects = document.getElementById("projects");
projects.addEventListener("mouseenter", function(event) {
    document.documentElement.style.setProperty("--grad-1", "#755316");
    document.documentElement.style.setProperty("--grad-2", "#4C1273");
});
projects.addEventListener("mouseleave", function(event) {
    document.documentElement.style.setProperty("--grad-1", "#12733C");
    document.documentElement.style.setProperty("--grad-2", "#4C1273");
});

var youtube = document.getElementById("youtube");
youtube.addEventListener("mouseenter", function(event) {
    document.documentElement.style.setProperty("--grad-1", "#ff0000");
    document.documentElement.style.setProperty("--grad-2", "#755316");
});
youtube.addEventListener("mouseleave", function(event) {
    document.documentElement.style.setProperty("--grad-1", "#12733C");
    document.documentElement.style.setProperty("--grad-2", "#4C1273");
});

var linkedin = document.getElementById("linkedin");
linkedin.addEventListener("mouseenter", function(event) {
    document.documentElement.style.setProperty("--grad-1", "#0a66c2");
    document.documentElement.style.setProperty("--grad-2", "#4C1273");
});
linkedin.addEventListener("mouseleave", function(event) {
    document.documentElement.style.setProperty("--grad-1", "#12733C");
    document.documentElement.style.setProperty("--grad-2", "#4C1273");
});

var gmail = document.getElementById("gmail");
gmail.addEventListener("mouseenter", function(event) {
    document.documentElement.style.setProperty("--grad-1", "#4285f4 ");
    document.documentElement.style.setProperty("--grad-2", "#34a853");
});
gmail.addEventListener("mouseleave", function(event) {
    document.documentElement.style.setProperty("--grad-1", "#12733C");
    document.documentElement.style.setProperty("--grad-2", "#4C1273");
});

var github = document.getElementById("github");
github.addEventListener("mouseenter", function(event) {
    document.documentElement.style.setProperty("--grad-1", "#1f883d ");
    document.documentElement.style.setProperty("--grad-2", "#0964da");
});
github.addEventListener("mouseleave", function(event) {
    document.documentElement.style.setProperty("--grad-1", "#12733C");
    document.documentElement.style.setProperty("--grad-2", "#4C1273");
});

var cv = document.getElementById("cv");
cv.addEventListener("mouseenter", function(event) {
    document.documentElement.style.setProperty("--grad-1", "#DB0F67 ");
    document.documentElement.style.setProperty("--grad-2", "#548636");
});
cv.addEventListener("mouseleave", function(event) {
    document.documentElement.style.setProperty("--grad-1", "#12733C");
    document.documentElement.style.setProperty("--grad-2", "#4C1273");
});

