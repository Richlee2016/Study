$(function() {
  const $btn = $('#testPost');
  $btn.click(() => {
    console.log(11);
    $.post('/testPost', { name: 'rich' }, data => {
      console.log(data);
    });
  });
});
