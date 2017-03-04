document.querySelector('.btn-reset').onclick = () => {
  localStorage.clear();
  initLevel();
};

document.querySelector('.btn-next').onclick = () => {
  let nextLvl = getLevel().next();
  if(nextLvl){
    setLevel(nextLvl.index)
    initLevel();
  } else {
    alert('This is the last Level!')
  }
};

document.querySelector('.btn-prev').onclick = () => {
  if(getLevel().index-1 < 0) {
    alert('This is the first Level!')
  } else {
    setLevel(getLevel().index-1)
    initLevel();
  }
};

// document.querySelector('.btn-undo').onclick = () => {};
