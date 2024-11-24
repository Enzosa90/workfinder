import { db } from "../db.js";

export const getEmpresa = (_, res) => {
    const q = "SELECT * FROM empresas";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addEmpresa = (req, res) => {
    const { nome_empresa, nome_fantasia, cnpj, inscricao_estadual, inscricao_municipal, telefone, cep, endereco, email, senha } = req.body;
    const q = "INSERT INTO empresas (nome_empresa, nome_fantasia, cnpj, inscricao_estadual, inscricao_municipal, telefone, cep, endereco, email, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [nome_empresa, nome_fantasia, cnpj, inscricao_estadual, inscricao_municipal, telefone, cep, endereco, email, senha];

    db.query(q, values, (err, result) => {
        if (err) {
            console.log(err);
            console.log(result);
            return res.status(500).json({ error: "Erro ao adicionar empresa" });
        }
        return res.status(201).json({ message: "Empresa cadastrado com sucesso" });
    });
};
