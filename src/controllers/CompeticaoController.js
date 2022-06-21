const Competicao = require("../models/Competicao");
const xl = require("excel4node");
module.exports = {
  async index(req, res) {
    const competicao = await Competicao.findAll();

    res.json(competicao);
  },
  async store(req, res) {
    const { nome, data_inicio, data_fim, data_prazo_inscricoes } = req.body;

    const competicao = await Competicao.create({
      nome,
      data_inicio,
      data_fim,
      data_prazo_inscricoes,
    });

    return res.json(competicao);
  },
  async update(req, res) {
    const { nome, data_inicio, data_fim, data_prazo_inscricoes } = req.body;
    const { id } = req.params;

    const verificaCompeticao = await Competicao.findByPk(id);

    if (!verificaCompeticao) {
      return res.status(400).json({ error: "Competição não encontrada!" });
    }

    await Competicao.update(
      { nome, data_inicio, data_fim, data_prazo_inscricoes },
      { where: { id: id } }
    );

    const retorno = await Competicao.findByPk(id);
    return res.json(retorno);
  },
  async delete(req, res) {
    const { id } = req.params;

    const competicao = await Competicao.findByPk(id);
    if (!competicao) {
      res.status(400).json({ error: "Competição não encontrada" });
    } else {
      await competicao.destroy({
        where: { id: id },
      });

      res.json({ retorno: "Competição deletada com sucesso!" });
    }
  },
  async gerarXLSX(req, res) {
    //validacao se existe competicao

    // const { id } = req.params;
    //  const competicao = await Competicao.findByPk(id);

    // if (!competicao) {
    //   res.status(400).json({ error: "Competição não encontrada" });
    // }

    //Criacao do Workbook
    const wb = new xl.Workbook();
    //nome para a planilha
    const ws = wb.addWorksheet("Nome da planilha");

    //Busca no banco para retorno -- fazer

    const data = [
      {
        Name: "Ramon Vinicius Marqueviski",
        "Member id": "000001",
        Event: "SMSenior",
        "Partner id": "123123123",
        DoB: "04/04/2001",
        Paid: "R$ 30,00",
        Club: "Furiacao",
      },
      {
        Name: "Afonso",
        "Member id": "000002",
        Event: "SMSenior",
        "Partner id": "123123123",
        DoB: "04/04/2001",
        Paid: "R$ 30,00",
        Club: "Furiacao",
      },
      {
        Name: "Joao Elias",
        "Member id": "000003",
        Event: "SMSenior",
        "Partner id": "123123123",
        DoB: "04/04/2001",
        Paid: "R$ 30,00",
        Club: "Furiacao",
      },
    ];

    //Titulos da planilha

    const headingColumnsNames = [
      "Name",
      "Member id",
      "Event",
      "Partner id",
      "DoB",
      "Paid",
      "Club",
    ];
    //Define o inicio das colunas
    let headingColumnIndex = 1;

    //Monta o header
    headingColumnsNames.forEach((heading) => {
      ws.cell(1, headingColumnIndex++).string(heading);
    });

    //Montando o body

    //Define o inicio da linha
    let rowIndex = 2;

    //Monta o body passando pelo array de objetos
    data.forEach((record) => {
      let ColumnIndex = 1;
      Object.keys(record).forEach((columnName) => {
        ws.cell(rowIndex, ColumnIndex++).string(record[columnName]);
      });
      rowIndex++;
    });

    let name = "Competicao_Blast";
    wb.write(`./ExcelReports/${name}.xlsx`);
    res.json({ retorno: "Excel gerado!" });
  },
};
