$(function() {
  $("#home-title-container").fadeIn(600, function() {
    $("#links").fadeIn(600);
  });

  $("#about").click(function() {
    $("#back").fadeIn();
    $("#home-page").fadeOut();
    transitionToAboutPage();
    $("#about-page").fadeIn();
  });
  $("#work").click(function() {
    $("#back").fadeIn();
    $("#home-page").fadeOut();
    transitionToWorkPage();
    $("#work-page").fadeIn(function() {
      updateScreenSize();
    });
  });
  $("#resume").click(function() {
    window.location.href = "CV.pdf"
  });
  $("#back").click(function() {
    $(this).fadeOut();
    updateScreenSize();
    $(".page").fadeOut();
    transitionToHomePage();
    $("#home-page").fadeIn();
  });
});
