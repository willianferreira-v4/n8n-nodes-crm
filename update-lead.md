### create lead fields

credential config:

headers: {
x-client-id: "id-example",
x-client-secret: "secret-example",
}

api url field to update lead in credential config too.

custom_field_ids field accepts object like this

```
    "arquivado": {
      "id": "4a3d9742-b3ac-4a76-8b22-965903016b7d",
      "type": "BOOLEAN"
    },
    "lead_enriquecido": {
      "id": "8fad7933-3dd8-422b-a490-c7e6f2bfcf62",
      "type": "BOOLEAN"
    },
    "justificativa": {
      "id": "f503cdca-86c6-46c1-8378-d7c6befc8167",
      "type": "TEXT_LONG"
    },
    "franquia_csc_oportunidade": {
      "id": "32ca9c3b-81fc-4d87-b402-fd62941dfe81",
      "type": "TEXT_SHORT"
    }
```

body specific for each type (cardId is a external value will become from another node)

```
  if(["TEXT_SHORT", "TEXT_LONG", "DROPDOWN"].includes(type)){
    body = {
      "cardId": cardId,
      "cardCustomFieldsId": fieldId,
      "listValues": [value],
    }
  }
  else if(["DATETIME", "DATE"].includes(type)){
    body = {
      "cardId": cardId,
      "cardCustomFieldsId": fieldId,
      "dateValue": value,
    }
  }
  else if(type === "BOOLEAN"){
    body = {
      "cardId": cardId,
      "cardCustomFieldsId": fieldId,
      "booleanValue": value,
    }
  }
```

select for all this fields (you can get the field id to send in the body in credentials config):
{
"razao_da_desqualificacao": {
"type": "DROPDOWN",
"options": [
"Adolescente/Criança",
"Blocklist",
"Sem budget",
"Sem necessidade",
"Cliente oculto",
"Sem autoridade",
"Cliente",
"Ex-cliente (detrator)",
"Pessoa Física",
"Engano/Não Lembra",
"Deixou de responder",
"Nunca respondeu",
"Sem timing",
"Serviço fora de escopo",
"Duplicado",
"Contatos inválidos",
"Sem interesse",
"SPAM",
"Não ICP"
]
},
"descricao_da_desqualificacao": {
"id": "ddd4a0c2-fd1a-45de-960b-9a25e16d30b3",
"type": "TEXT_LONG"
},
"arquivado": {
"id": "d51d2a62-003d-44b3-8569-9d96035b7c23",
"type": "BOOLEAN"
},
"cohort": {
"type": "DROPDOWN",
"options": [
"CPG",
"Education",
"Financial Services",
"Food Service",
"Franchisee",
"Real State",
"Retail",
"Service B2C Multilocation",
"Solar Energy / Electric Power",
"TELCO",
"Outros",
"Service B2B Multilocation"
]
},
"faturamento_mensal": {
"type": "DROPDOWN",
"options": [
"Até 50 mil",
"De 51 mil à 70 mil",
"De 71 mil à 100 mil",
"De 101 mil à 200 mil",
"De 201 mil à 400 mil",
"De 101 mil à 400 mil",
"De 401 mil à 1 milhão",
"De 1 à 4 milhões",
"De 4 à 16 milhões",
"De 16 à 40 milhões",
"Mais de 40 milhões",
"Until $10K",
"From $11K to $20K",
"From $21K to $30K",
"From $31K to $40K",
"From $41K to $50K",
"From $51K to $70K",
"From $71K to $100K",
"From $101K to $200K",
"From $201K to $400K",
"From $401K to $1M",
"More than $1M",
"From $1M to $4M",
"From $4M to $16M",
"From $16M to $40M",
"More than $40M"
]
},
"detalhes_da_qualificacao": {
"id": "a25a7635-adca-4f9d-8dc1-b432d9c522f6",
"type": "TEXT_LONG"
},
"e_sao": {
"id": "ebb0928a-1606-4b75-91e5-d7f3c50fad5d",
"type": "BOOLEAN"
},
"temperatura": {
"type": "DROPDOWN",
"options": [
"Quente",
"Morno",
"Frio"
]
},
"data_de_fechamento_estimada": {
"id": "f4c04092-d6df-4e1b-9826-d261c4b90c1a",
"type": "DATE"
},
"data_de_observacoes_do_bant": {
"id": "23edc704-5564-481a-8c3d-a63a42c3680c",
"type": "DATE"
},
"qualidade_da_reuniao": {
"id": "5c957ebc-9cea-42a1-93a8-9bd209fc54c2",
"type": "TEXT_LONG"
},
"justificativa": {
"id": "f951b37e-dad3-4370-8e2f-9436db90a895",
"type": "TEXT_LONG"
},
"descricao_feita_pelo_lead": {
"id": "50bfcf91-1ed1-4500-8e4a-c1731c52084d",
"type": "TEXT_LONG"
},
"form_name": {
"id": "cc8602e2-c006-4fac-8668-4db95c56a8f6",
"type": "TEXT_SHORT"
},
"page_name": {
"id": "2da60f79-16b3-4096-9c9f-9c0673b30429",
"type": "TEXT_SHORT"
},
"valor_leadbroker": {
"id": "5d15efb6-bfbc-41e4-8223-9a3cc6e5c51d",
"type": "NUMBER_DECIMAL"
},
"status_da_reuniao": {
"type": "DROPDOWN",
"options": [
"Falta marcar",
"Falta acontecer",
"Aconteceu",
"No show"
]
},
"data_hora_da_reuniao": {
"id": "c12f3304-15d0-494b-ac9b-b49d239d3142",
"type": "DATETIME"
},
"campaign_id": {
"id": "e164e116-f33d-45bf-8be2-14b23e79d9f3",
"type": "TEXT_SHORT"
},
"adset_id": {
"id": "7285d537-c0ea-4166-8882-a4dabad019c0",
"type": "TEXT_SHORT"
},
"ad_id": {
"id": "5fe8fa4f-9666-4d86-b526-9e0cf74aa083",
"type": "TEXT_SHORT"
},
"fbclid": {
"id": "88455606-5b95-4b5e-9e34-bdb43a3ce3ed",
"type": "TEXT_LONG"
},
"gclid": {
"id": "d45eb67e-ac19-46e0-b39f-c0d507d1e727",
"type": "TEXT_SHORT"
},
"external_id": {
"id": "ca7effab-a397-4e64-a920-45eff8bccbaf",
"type": "TEXT_SHORT"
},
"session_id": {
"id": "5e1f9a55-558e-41a5-83ca-f9bd25fbf0a7",
"type": "TEXT_SHORT"
},
"client_id": {
"id": "ee17bb2b-9699-4af7-b7b6-6e9c56bc97e4",
"type": "TEXT_SHORT"
},
"fbp": {
"id": "fb1b77a8-8103-4273-a22f-d8de103da16d",
"type": "TEXT_SHORT"
},
"fbc": {
"id": "96d68cdc-6e52-497a-8e1b-fe3b9efd62b3",
"type": "TEXT_LONG"
},
"session_number": {
"id": "008dc91a-26a7-4fa9-a109-84b2ea31e820",
"type": "TEXT_SHORT"
},
"fb_lead_id": {
"id": "0c7389f2-e65c-441f-ace8-33dd9f39335c",
"type": "TEXT_SHORT"
},
"id_de_resposta_do_formulario": {
"id": "87795b6a-2dbc-4f60-8a8c-7029cb5f6416",
"type": "TEXT_SHORT"
},
"nome_da_campanha_de_email": {
"id": "4c5c9bd8-36f2-4232-9978-23d4094feab3",
"type": "TEXT_SHORT"
},
"id_da_campanha_de_email": {
"id": "659e8519-247d-42d5-aee0-16af136751b8",
"type": "TEXT_SHORT"
},
"ip_do_cadastro": {
"id": "61e650bb-e591-46f6-afdb-eb8b964d9eb5",
"type": "TEXT_SHORT"
},
"subnicho_v4_food": {
"type": "DROPDOWN",
"options": [
"Lanchonete e Hamburgueria",
"Culinária Japonesa",
"Pizzaria e Esfiharia",
"Cozinha Internacional",
"Açaí e Sorvetes",
"Marmitaria e Comida Brasileira",
"Comida Saudável",
"Doces e Sobremesas"
]
},
"primeiro_destino": {
"type": "DROPDOWN",
"options": [
"Blackbox",
"LB",
"CRM"
]
},
"data_de_cadastro": {
"id": "bbf43cac-a516-4d08-ae92-7b80f19f7a1b",
"type": "DATE"
},
"sem_roteamento": {
"id": "43b2fef5-8472-4370-bf39-1c59c283a7ac",
"type": "BOOLEAN"
},
"cargo": {
"id": "d1e0deec-b5ab-4731-a546-64b6a586d4e3",
"type": "TEXT_SHORT"
},
"urgencia": {
"id": "414ed3fe-4763-4cdc-b0be-6d3af96e91f0",
"type": "TEXT_SHORT"
},
"franquia_csc": {
"id": "71cedcaa-042a-4a60-9a88-5fc80957a8b6",
"type": "TEXT_SHORT"
},
"franquia_csc_oportunidade": {
"id": "d52328a7-e66e-42cf-98e8-9b0aad4f7b75",
"type": "TEXT_SHORT"
},
"id_franquia_csc": {
"id": "269aa519-7314-41b3-b071-186b942aa969",
"type": "TEXT_SHORT"
},
"status_leadbroker": {
"type": "DROPDOWN",
"options": [
"Leilão",
"Lead Não Comprado",
"Black Box",
"Não Leiloado",
"Staage",
"Lead Comprado"
]
},
"enviar_para_o_deal_broker": {
"id": "72b705d1-7f94-4829-899f-cdecda135c90",
"type": "BOOLEAN"
},
"segmento": {
"type": "DROPDOWN",
"options": [
"Serviço",
"Varejo",
"Indústria",
"E-commerce",
"Food Service",
"Educação",
"Imobiliária",
"SAAS",
"Finanças",
"Franquia / Franchising",
"Telecom",
"Energia Solar",
"Turismo",
"Outro"
]
},
"csc": {
"id": "d6e107a3-4ebf-4cc6-b16f-85b0d87a5b24",
"type": "BOOLEAN"
},
"csc_oportunidade": {
"id": "ca3a8030-4add-4f0c-ab76-7bdc69bb2341",
"type": "BOOLEAN"
},
"observacoes": {
"id": "f70d9e05-e13f-478d-bb92-98bbb06d0800",
"type": "TEXT_LONG"
},
"produtos_marketing": {
"type": "DROPDOWN",
"options": [
"Soluções Comerciais",
"Estruturação Estratégica",
"Assessoria",
"MVP USA",
"Assessoria Recuperado Hyperflow",
"Blackbox",
"Auditoria Growth",
"O Único Plano",
"Alavancagem Comercial",
"Vender Gera Equity",
"A Alavanca",
"Masterclass GdM",
"Treinamento Comercial",
"Mentoria GT",
"V4 Food",
"RPE",
"Material Rico",
"ROI System",
"Gabarito de Recordes de Vendas",
"Mesa4X",
"Bday 2025",
"V4 Marketing"
]
},
"canal_de_aquisicao": {
"type": "DROPDOWN",
"options": [
"Leadbroker",
"Blackbox",
"Meetingbroker",
"LP Matriz",
"LP Franquia",
"Prospecção Fria",
"Eventos",
"Indicação",
"Recomendação",
"ABM",
"Networking",
"Reativação",
"Inside Box",
"Food Box",
"Pandora Box",
"Reposição Inside Box"
]
},
"faturamento_da_lp": {
"type": "DROPDOWN",
"options": [
"Até 50 mil",
"De 51 mil à 70 mil",
"De 71 mil à 100 mil",
"De 101 mil à 200 mil",
"De 201 mil à 400 mil",
"De 101 mil à 400 mil",
"De 401 mil à 1 milhão",
"De 1 à 4 milhões",
"De 4 à 16 milhões",
"De 16 a 40 milhões",
"Mais de 40 milhões",
"Until $10K",
"From $11K to $20K",
"From $21K to $30K",
"From $31K to $40K",
"From $41K to $50K",
"From $51K to $70K",
"From $71K to $100K",
"From $101K to $200K",
"From $201K to $400K",
"From $401K to $1M",
"More than $1M",
"From $1M to $4M",
"From $4M to $16M",
"From $16M to $40M",
"More than $40M",
"Until $10K",
"From $11K to $20K",
"From $21K to $30K",
"From $31K to $40K",
"From $41K to $50K",
"From $51K to $70K",
"From $71K to $100K",
"From $101K to $200K",
"From $201K to $400K",
"From $401K to $1M",
"More than $1M",
"From $1M to $4M",
"From $4M to $16M",
"From $16M to $40M",
"More than $40M"
]
},
"id_franquia_oportunidade": {
"id": "1cb98bad-bef6-4de7-8685-b97f832b5f27",
"type": "TEXT_SHORT"
},
"fonte_do_lead": {
"type": "DROPDOWN",
"options": [
"Inside",
"Outside"
]
},
"fonte_da_oportunidade": {
"type": "DROPDOWN",
"options": [
"Inside",
"Outside"
]
},
"canal_de_origem": {
"type": "DROPDOWN",
"options": [
"Facebook",
"Google",
"Orgânico",
"Institucional",
"Bing",
"TikTok",
"LinkedIn",
"Twitter",
"Taboola",
"Embaixadores/Networking",
"Pinterest",
"Programática",
"Indicação de Parceiro",
"Indicação de Investidor",
"Indicação de Franqueado",
"Recomendação Closer",
"Recomendação BDR/SDR",
"Lista de Leads Frios",
"Acelerador Empresarial",
"Equity+",
"Gestão 4.0",
"Eventos em Parceria (não homologados na Matriz)",
"Eventos Independentes (Regionais/Locais)",
"B coorporate",
"Escola Franchising",
"G4 Alumni",
"G4 Gestão e Estratégia",
"G4 Marketing e Growth",
"G4 Sales",
"G4 Scale",
"G4 Traction",
"Goshen Land",
"Jotaja",
"Luminare",
"Multiplix",
"Open Mind",
"RGV",
"Scale",
"Scale Company",
"Scale Up",
"Seja Ap",
"SME",
"Vende C",
"Acelerador Experience",
"Independente",
"Campanha de Recuperação",
"Reddit",
"Reativação"
]
},
"modelo_de_negocios": {
"type": "DROPDOWN",
"options": [
"Inside Sales",
"PDV - Varejo/Retail",
"Infoproduto/Educação Perpétuo",
"Lançamento",
"Aplicativo (PLG)",
"E-commerce",
"Food Service"
]
}
}
