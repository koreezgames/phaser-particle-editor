$(function () {
  $('#emittersTabsGroup').find('a:first').tab('show')

  $('.dropdown-menu').on('click', 'a', function (e) {
    let button = $('.btn:first-child', $(this).parent().parent())
    button.text($(this).text())
  })
})
