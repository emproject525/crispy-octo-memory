// 사진
t.map((item) => {
  var idx = Math.floor(Math.random() * 10) + 1;

  var info = meta[idx - 1];
  var fileName = `pic_${idx}.${info.format}`;
  var filePath = `/images/${fileName}`;

  item.width = info.width;
  item.height = info.height;
  item.dpi = info.dpi;
  item.format = info.format;
  item.fileName = fileName;
  item.orgFileName = fileName;
  item.filePath = filePath;
  item.fileSize = info.fileSize;

  return item;
});

function replaceDt(before, fillToday) {
  if (!before) {
    if (fillToday === true) {
      const today = new Date();
      var year = today.getFullYear();
      var month = ('00' + (today.getMonth() + 1)).slice(-2);
      var date = ('00' + today.getDate()).slice(-2);
      var hours = ('00' + today.getHours()).slice(-2);
      var minutes = ('00' + today.getMinutes()).slice(-2);
      var seconds = ('00' + today.getSeconds()).slice(-2);

      return (
        year +
        '-' +
        month +
        '-' +
        date +
        ' ' +
        hours +
        ':' +
        minutes +
        ':' +
        seconds
      );
    }

    return null;
  }

  return before.replace('T', ' ');
}

// 영상
t.map((item) => {
  var newItem = {};
  var idx = Math.floor(Math.random() * 13) + 1;

  var info = meta[idx - 1];
  newItem.mediaType = info.mediaType;
  newItem.format = info.format;
  newItem.fileSize = info.fileSize;
  newItem.fileName = info.fileName;
  newItem.filePath = info.filePath;
  newItem.orgFileName = info.orgFileName;
  newItem.thumbFilePath = info.thumbFilePath;

  newItem.contId = Number(item.contId);
  newItem.contType = 'V';
  newItem.serviceStatus = '01';
  newItem.title = newItem.orgFileName;
  newItem.media = 1;
  newItem.source = 1;
  newItem.department = 1;
  newItem.archStatus = '99';
  newItem.caption = item.caption;
  newItem.keyword = item.keywords;
  newItem.shootDt = item.shootDt || null;
  newItem.shootPlace = item.shootPlace || null;
  newItem.shootType = '00';
  newItem.payYn = item.payYn;
  newItem.adultYn = item.adultYn;
  newItem.permissionYn = item.copyrtYn === 'Y' ? 'N' : 'Y';
  newItem.copyrt = item.copyrt;
  newItem.regId = 'test01';
  newItem.regDt = replaceDt(item.regDt, true);
  newItem.modDt = replaceDt(item.modDt);
  newItem.modDt = item.modDt ? 'test01' : null;
  newItem.delId = item.delId ? 'test01' : null;
  newItem.delDt = replaceDt(item.delDt);

  return newItem;
});
