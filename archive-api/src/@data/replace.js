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
  newItem.duration = info.duration || 0;

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
  newItem.modId = item.modDt ? 'test01' : null;
  newItem.modDt = replaceDt(undefined, true);
  newItem.delId = item.delId ? 'test01' : null;
  newItem.delDt = replaceDt(item.delDt);

  return newItem;
});

// 오디오
t.map((item) => {
  var newItem = {};
  var idx = Math.floor(Math.random() * 10) + 1;

  var info = meta[idx - 1];
  newItem.mediaType = info.mediaType || '99';
  newItem.format = info.format;
  newItem.fileSize = info.fileSize;
  newItem.fileName = info.fileName;
  newItem.filePath = info.filePath;
  newItem.orgFileName = info.orgFileName;
  newItem.thumbFilePath = info.thumbFilePath;
  newItem.duration = info.duration || 0;

  newItem.contId = Number(item.contId);
  newItem.contType = 'V';
  newItem.serviceStatus = '01';
  newItem.title = newItem.fileName;
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
  newItem.permissionYn = info.permissionYn || 'Y';
  newItem.copyrt = info.copyrt;
  newItem.regId = 'test01';
  newItem.regDt = replaceDt(item.regDt, true);
  newItem.modId = item.modDt ? 'test01' : null;
  newItem.modDt = replaceDt(undefined, true);
  newItem.delId = item.delId ? 'test01' : null;
  newItem.delDt = replaceDt(item.delDt);

  return newItem;
});

// 문서
t.map((item) => {
  var newItem = {};
  var writersCnt = Math.floor(Math.random() * 6) + 1;

  newItem.contId = Number(item.contId);
  newItem.contType = 'T';
  newItem.serviceStatus = '01';
  newItem.title = item.title;
  newItem.media = 1;
  newItem.source = 1;
  newItem.writers =
    (item.writers || []).length > 0
      ? item.writers
      : writers.slice(-1 * writersCnt).map((item) => item.id);
  newItem.archStatus = '99';
  newItem.subTitle = item.subTitle || '';
  newItem.body =
    '탄핵소추의 의결을 받은 자는 탄핵심판이 있을 때까지 그 권한행사가 정지된다. 헌법개정안이 제2항의 찬성을 얻은 때에는 헌법개정은 확정되며, 대통령은 즉시 이를 공포하여야 한다. 제2항과 제3항의 처분에 대하여는 법원에 제소할 수 없다. 선거운동은 각급 선거관리위원회의 관리하에 법률이 정하는 범위안에서 하되, 균등한 기회가 보장되어야 한다. 국교는 인정되지 아니하며, 종교와 정치는 분리된다. 국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을 증가하거나 새 비목을 설치할 수 없다. 재의의 요구가 있을 때에는 국회는 재의에 붙이고, 재적의원과반수의 출석과 출석의원 3분의 2 이상의 찬성으로 전과 같은 의결을 하면 그 법률안은 법률로서 확정된다.\n군사법원의 조직·권한 및 재판관의 자격은 법률로 정한다. 전직대통령의 신분과 예우에 관하여는 법률로 정한다. 대통령의 국법상 행위는 문서로써 하며, 이 문서에는 국무총리와 관계 국무위원이 부서한다. 군사에 관한 것도 또한 같다. 모든 국민은 인간으로서의 존엄과 가치를 가지며, 행복을 추구할 권리를 가진다. 국가는 개인이 가지는 불가침의 기본적 인권을 확인하고 이를 보장할 의무를 진다. 선거에 있어서 최고득표자가 2인 이상인 때에는 국회의 재적의원 과반수가 출석한 공개회의에서 다수표를 얻은 자를 당선자로 한다. 행정각부의 설치·조직과 직무범위는 법률로 정한다. 헌법재판소 재판관의 임기는 6년으로 하며, 법률이 정하는 바에 의하여 연임할 수 있다.\n대법원장은 국회의 동의를 얻어 대통령이 임명한다. 이 헌법시행 당시의 대법원장과 대법원판사가 아닌 법관은 제1항 단서의 규정에 불구하고 이 헌법에 의하여 임명된 것으로 본다. 정당은 법률이 정하는 바에 의하여 국가의 보호를 받으며, 국가는 법률이 정하는 바에 의하여 정당운영에 필요한 자금을 보조할 수 있다. 국정의 중요한 사항에 관한 대통령의 자문에 응하기 위하여 국가원로로 구성되는 국가원로자문회의를 둘 수 있다. 국가는 모성의 보호를 위하여 노력하여야 한다. 이 헌법공포 당시의 국회의원의 임기는 제1항에 의한 국회의 최초의 집회일 전일까지로 한다. 중앙선거관리위원회는 법령의 범위안에서 선거관리·국민투표관리 또는 정당사무에 관한 규칙을 제정할 수 있으며, 법률에 저촉되지 아니하는 범위안에서 내부규율에 관한 규칙을 제정할 수 있다.\n모든 국민은 주거의 자유를 침해받지 아니한다. 주거에 대한 압수나 수색을 할 때에는 검사의 신청에 의하여 법관이 발부한 영장을 제시하여야 한다. 연소자의 근로는 특별한 보호를 받는다. 국무총리는 대통령을 보좌하며, 행정에 관하여 대통령의 명을 받아 행정각부를 통할한다. 대통령은 국무총리·국무위원·행정각부의 장 기타 법률이 정하는 공사의 직을 겸할 수 없다. 한 회계연도를 넘어 계속하여 지출할 필요가 있을 때에는 정부는 연한을 정하여 계속비로서 국회의 의결을 얻어야 한다. 국군은 국가의 안전보장과 국토방위의 신성한 의무를 수행함을 사명으로 하며, 그 정치적 중립성은 준수된다.\n감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 국가는 노인과 청소년의 복지향상을 위한 정책을 실시할 의무를 진다. 국가는 대외무역을 육성하며, 이를 규제·조정할 수 있다. 국회의원은 그 지위를 남용하여 국가·공공단체 또는 기업체와의 계약이나 그 처분에 의하여 재산상의 권리·이익 또는 직위를 취득하거나 타인을 위하여 그 취득을 알선할 수 없다. 국채를 모집하거나 예산외에 국가의 부담이 될 계약을 체결하려 할 때에는 정부는 미리 국회의 의결을 얻어야 한다. 예비비는 총액으로 국회의 의결을 얻어야 한다. 예비비의 지출은 차기국회의 승인을 얻어야 한다.\n국회에서 의결된 법률안은 정부에 이송되어 15일 이내에 대통령이 공포한다. 국가는 농지에 관하여 경자유전의 원칙이 달성될 수 있도록 노력하여야 하며, 농지의 소작제도는 금지된다. 모든 국민은 건강하고 쾌적한 환경에서 생활할 권리를 가지며, 국가와 국민은 환경보전을 위하여 노력하여야 한다. 대통령의 임기는 5년으로 하며, 중임할 수 없다. 모든 국민은 자기의 행위가 아닌 친족의 행위로 인하여 불이익한 처우를 받지 아니한다. 대통령은 국무회의의 의장이 되고, 국무총리는 부의장이 된다. 국회의원이 회기전에 체포 또는 구금된 때에는 현행범인이 아닌 한 국회의 요구가 있으면 회기중 석방된다.\n대한민국의 영토는 한반도와 그 부속도서로 한다. 사회적 특수계급의 제도는 인정되지 아니하며, 어떠한 형태로도 이를 창설할 수 없다. 모든 국민은 법 앞에 평등하다. 누구든지 성별·종교 또는 사회적 신분에 의하여 정치적·경제적·사회적·문화적 생활의 모든 영역에 있어서 차별을 받지 아니한다. 모든 국민은 법률이 정하는 바에 의하여 국방의 의무를 진다. 누구든지 체포 또는 구속을 당한 때에는 적부의 심사를 법원에 청구할 권리를 가진다. 국무총리·국무위원 또는 정부위원은 국회나 그 위원회에 출석하여 국정처리상황을 보고하거나 의견을 진술하고 질문에 응답할 수 있다. 국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다.\n국가는 과학기술의 혁신과 정보 및 인력의 개발을 통하여 국민경제의 발전에 노력하여야 한다. 대통령후보자가 1인일 때에는 그 득표수가 선거권자 총수의 3분의 1 이상이 아니면 대통령으로 당선될 수 없다. 명령·규칙 또는 처분이 헌법이나 법률에 위반되는 여부가 재판의 전제가 된 경우에는 대법원은 이를 최종적으로 심사할 권한을 가진다. 모든 국민은 법률이 정하는 바에 의하여 공무담임권을 가진다. 대통령은 제1항과 제2항의 처분 또는 명령을 한 때에는 지체없이 국회에 보고하여 그 승인을 얻어야 한다. 제안된 헌법개정안은 대통령이 20일 이상의 기간 이를 공고하여야 한다. 대한민국은 통일을 지향하며, 자유민주적 기본질서에 입각한 평화적 통일 정책을 수립하고 이를 추진한다.\n재판의 전심절차로서 행정심판을 할 수 있다. 행정심판의 절차는 법률로 정하되, 사법절차가 준용되어야 한다. 대법원은 법률에 저촉되지 아니하는 범위안에서 소송에 관한 절차, 법원의 내부규율과 사무처리에 관한 규칙을 제정할 수 있다. 행정각부의 장은 국무위원 중에서 국무총리의 제청으로 대통령이 임명한다. 비상계엄하의 군사재판은 군인·군무원의 범죄나 군사에 관한 간첩죄의 경우와 초병·초소·유독음식물공급·포로에 관한 죄중 법률이 정한 경우에 한하여 단심으로 할 수 있다. 다만, 사형을 선고한 경우에는 그러하지 아니하다. 누구든지 체포 또는 구속의 이유와 변호인의 조력을 받을 권리가 있음을 고지받지 아니하고는 체포 또는 구속을 당하지 아니한다. 체포 또는 구속을 당한 자의 가족등 법률이 정하는 자에게는 그 이유와 일시·장소가 지체없이 통지되어야 한다.\n국무회의는 대통령·국무총리와 15인 이상 30인 이하의 국무위원으로 구성한다. 모든 국민은 양심의 자유를 가진다. 모든 국민은 능력에 따라 균등하게 교육을 받을 권리를 가진다. 이 헌법은 1988년 2월 25일부터 시행한다. 다만, 이 헌법을 시행하기 위하여 필요한 법률의 제정·개정과 이 헌법에 의한 대통령 및 국회의원의 선거 기타 이 헌법시행에 관한 준비는 이 헌법시행 전에 할 수 있다. 법원은 최고법원인 대법원과 각급법원으로 조직된다. 이 헌법시행 당시의 법령과 조약은 이 헌법에 위배되지 아니하는 한 그 효력을 지속한다. 헌법재판소 재판관은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니한다.\n감사원은 세입·세출의 결산을 매년 검사하여 대통령과 차년도국회에 그 결과를 보고하여야 한다. 언론·출판에 대한 허가나 검열과 집회·결사에 대한 허가는 인정되지 아니한다. 대통령의 선거에 관한 사항은 법률로 정한다. 제1항의 해임건의는 국회재적의원 3분의 1 이상의 발의에 의하여 국회재적의원 과반수의 찬성이 있어야 한다. 국민경제자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 국무위원은 국정에 관하여 대통령을 보좌하며, 국무회의의 구성원으로서 국정을 심의한다. 감사원은 원장을 포함한 5인 이상 11인 이하의 감사위원으로 구성한다. 대법관의 임기는 6년으로 하며, 법률이 정하는 바에 의하여 연임할 수 있다.\n체포·구속·압수 또는 수색을 할 때에는 적법한 절차에 따라 검사의 신청에 의하여 법관이 발부한 영장을 제시하여야 한다. 다만, 현행범인인 경우와 장기 3년 이상의 형에 해당하는 죄를 범하고 도피 또는 증거인멸의 염려가 있을 때에는 사후에 영장을 청구할 수 있다. 국가안전보장회의는 대통령이 주재한다. 대법원장과 대법관이 아닌 법관의 임기는 10년으로 하며, 법률이 정하는 바에 의하여 연임할 수 있다. 법관은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니하며, 징계처분에 의하지 아니하고는 정직·감봉 기타 불리한 처분을 받지 아니한다. 대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.\n선거와 국민투표의 공정한 관리 및 정당에 관한 사무를 처리하기 위하여 선거관리위원회를 둔다. 이 헌법에 의한 최초의 대통령의 임기는 이 헌법시행일로부터 개시한다. 모든 국민은 고문을 받지 아니하며, 형사상 자기에게 불리한 진술을 강요당하지 아니한다. 각급 선거관리위원회의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 공무원의 직무상 불법행위로 손해를 받은 국민은 법률이 정하는 바에 의하여 국가 또는 공공단체에 정당한 배상을 청구할 수 있다. 이 경우 공무원 자신의 책임은 면제되지 아니한다. 국회는 헌법 또는 법률에 특별한 규정이 없는 한 재적의원 과반수의 출석과 출석의원 과반수의 찬성으로 의결한다. 가부동수인 때에는 부결된 것으로 본다.\n대법원과 각급법원의 조직은 법률로 정한다. 대통령은 조약을 체결·비준하고, 외교사절을 신임·접수 또는 파견하며, 선전포고와 강화를 한다. 신체장애자 및 질병·노령 기타의 사유로 생활능력이 없는 국민은 법률이 정하는 바에 의하여 국가의 보호를 받는다. 국토와 자원은 국가의 보호를 받으며, 국가는 그 균형있는 개발과 이용을 위하여 필요한 계획을 수립한다. 국가는 주택개발정책등을 통하여 모든 국민이 쾌적한 주거생활을 할 수 있도록 노력하여야 한다. 국무회의는 정부의 권한에 속하는 중요한 정책을 심의한다. 대통령은 국가의 독립·영토의 보전·국가의 계속성과 헌법을 수호할 책무를 진다.\n법률이 헌법에 위반되는 여부가 재판의 전제가 된 경우에는 법원은 헌법재판소에 제청하여 그 심판에 의하여 재판한다. 국가는 사회보장·사회복지의 증진에 노력할 의무를 진다. 대통령은 법률에서 구체적으로 범위를 정하여 위임받은 사항과 법률을 집행하기 위하여 필요한 사항에 관하여 대통령령을 발할 수 있다. 헌법재판소에서 법률의 위헌결정, 탄핵의 결정, 정당해산의 결정 또는 헌법소원에 관한 인용결정을 할 때에는 재판관 6인 이상의 찬성이 있어야 한다. 여자의 근로는 특별한 보호를 받으며, 고용·임금 및 근로조건에 있어서 부당한 차별을 받지 아니한다. 국회는 국정을 감사하거나 특정한 국정사안에 대하여 조사할 수 있으며, 이에 필요한 서류의 제출 또는 증인의 출석과 증언이나 의견의 진술을 요구할 수 있다.';
  newItem.keyword = item.keywords;
  newItem.payYn = item.payYn || 'N';
  newItem.adultYn = item.adultYn || 'N';
  newItem.permissionYn = item.copyrtYn || 'Y';
  newItem.copyrt = item.copyrt;
  newItem.regId = 'test01';
  newItem.regDt = replaceDt(item.regDt, true);
  newItem.modId = item.modDt ? 'test01' : null;
  newItem.modDt = replaceDt(undefined, true);
  newItem.delId = item.delId ? 'test01' : null;
  newItem.delDt = replaceDt(item.delDt);
  newItem.textType = '00';

  return newItem;
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

[
  '요다영',
  '비주얼',
  '가르나초',
  'audio',
  '중독사회',
  '현봉식',
  '사극',
  '민주당',
  '저격수',
  '밤양갱',
  '탄수화물',
  'video'
].map((item, idx) => ({
  seq: idx + 1,
  regId: 'test01',
  regDt: replaceDt(undefined, true),
  keyword: item
}));
