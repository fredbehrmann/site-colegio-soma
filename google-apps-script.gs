const SPREADSHEET_ID = '1yGTVd2CxhqLyBDDXEosD54V9Ixgb_gzdnOhGT1-suaw';
const SHEET_NAME = 'Agendamentos';
const HEADERS = [
  'Data e hora do envio',
  'Nome do responsável',
  'WhatsApp',
  'E-mail',
  'Etapa ou série de interesse',
  'Unidade de interesse',
  'Melhor período para contato',
  'Consentimento LGPD',
  'Status',
  'Observações',
];

function setupSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  spreadsheet.rename('Agendamentos do site - Escola SOMA');
  spreadsheet.setSpreadsheetLocale('pt_BR');
  spreadsheet.setSpreadsheetTimeZone('America/Bahia');

  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    const firstSheet = spreadsheet.getSheets()[0];
    if (spreadsheet.getSheets().length === 1 && firstSheet.getLastRow() === 0) {
      firstSheet.setName(SHEET_NAME);
      sheet = firstSheet;
    } else {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }
  }

  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setValues([HEADERS]);
  headerRange
    .setBackground('#0C2D57')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setWrap(true);

  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 42);
  [155, 220, 145, 220, 210, 170, 210, 150, 135, 260].forEach((width, index) => {
    sheet.setColumnWidth(index + 1, width);
  });
  sheet.setTabColor('#0C2D57');

  const dataRows = Math.max(sheet.getMaxRows() - 1, 1);
  sheet.getRange(2, 1, dataRows, 1).setNumberFormat('dd/MM/yyyy HH:mm:ss');
  sheet.getRange(2, 2, dataRows, 9).setVerticalAlignment('middle').setWrap(true);

  const statusRange = sheet.getRange(2, 9, dataRows, 1);
  const statusValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Novo', 'Em contato', 'Visita agendada', 'Concluído', 'Arquivado'], true)
    .setAllowInvalid(false)
    .build();
  statusRange.setDataValidation(statusValidation);

  const rules = [
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Novo').setBackground('#FFF2CC').setRanges([statusRange]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Em contato').setBackground('#D9EAF7').setRanges([statusRange]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Visita agendada').setBackground('#E2F0D9').setRanges([statusRange]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Concluído').setBackground('#D9EAD3').setRanges([statusRange]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Arquivado').setBackground('#E7E6E6').setRanges([statusRange]).build(),
  ];
  sheet.setConditionalFormatRules(rules);

  if (sheet.getFilter()) sheet.getFilter().remove();
  sheet.getRange(1, 1, sheet.getMaxRows(), HEADERS.length).createFilter();
  SpreadsheetApp.flush();
  return spreadsheet.getUrl();
}

function doGet() {
  return jsonResponse({ ok: true, service: 'Agendamentos Escola SOMA' });
}

function doPost(event) {
  const lock = LockService.getScriptLock();
  try {
    const payload = JSON.parse((event && event.postData && event.postData.contents) || '{}');

    if (payload.website) {
      return jsonResponse({ ok: true });
    }

    const required = ['responsavel', 'whatsapp', 'segmento', 'unidade', 'periodo'];
    const missing = required.filter((field) => !cleanCell(payload[field]));
    if (missing.length || payload.consentimento !== true) {
      return jsonResponse({ ok: false, error: 'Dados obrigatórios ausentes.' });
    }

    lock.waitLock(10000);
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('A aba Agendamentos não foi encontrada.');

    sheet.appendRow([
      new Date(),
      cleanCell(payload.responsavel),
      cleanCell(payload.whatsapp),
      cleanCell(payload.email),
      cleanCell(payload.segmento),
      cleanCell(payload.unidade),
      cleanCell(payload.periodo),
      'Sim',
      'Novo',
      '',
    ]);

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: 'Não foi possível registrar a solicitação.' });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function cleanCell(value) {
  const text = String(value || '').trim().slice(0, 500);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
