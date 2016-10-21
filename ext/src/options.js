// Saves options to chrome.storage
function save_options() {
  console.log("saving!");
  var action;
  var radios = document.getElementsByName('action');
  for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
          // do whatever you want with the checked radio
          action= radios[i].value;
          // only one radio can be logically checked, don't check the rest
          break;
      }
  }
  var replaceText = document.getElementById('replace-text').value;
  chrome.storage.sync.set({
    actionOnTroll: action,
    replaceWithText: replaceText
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    actionOnTroll: 'replace',
    replaceWithText: 'That\'s swell, I\'d just really like to be your friend'
  }, function(items) {
    if(items.actionOnTroll == 'replace')
      document.getElementById('rdb-replace').checked = true;
    else
    document.getElementById('rdb-hide').checked = true;
    document.getElementById('replace-text').value = items.replaceWithText;
    // console.log("fetched! " + items.replaceWithText);
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
