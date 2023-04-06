document.addEventListener('DOMContentLoaded', function() {
    
    //Dropdown
    var drop = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(drop);
  });
    
  //Occult message
  const occult = document.querySelector('.occult');
  occult.addEventListener('click', (e)=>{
    close_sms();
  });

  setTimeout((name)=>{
    const sms = document.querySelector('.sms');
    sms.classList.add('hide');
  }, 2500);
  
  const close_sms = ()=>{
    const sms = document.querySelector('.sms');
    sms.classList.add('hide');
  }
