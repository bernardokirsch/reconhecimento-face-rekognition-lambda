
$.ajax(
  { url: 'https://s3.amazonaws.com/bernardo-site/dados.json',
    dataType: 'json',
    crossDomain: true,
    success: function (dados) {
      console.log(dados);
      montaTabela(dados);
    }
  })

  function montaTabela(dados) {

    for (var dados of dados) {

      if (dados.nome == 'analise') {

        var trTabelaAnalise = document.createElement("tr");

        var tdFotoAnalise = document.createElement("td");

        tdFotoAnalise = document.createElement("img");
        tdFotoAnalise.height = 400;
        tdFotoAnalise.width = 400;
        tdFotoAnalise.src = "https://s3.amazonaws.com/bernardo-imagens/analise.png";

        trTabelaAnalise.appendChild(tdFotoAnalise);

        var tabela = document.querySelector("#tabela-site");

        tabela.appendChild(trTabelaAnalise)
      }

      else {

        var trTabela = document.createElement("tr");

        var tdInfoFoto = document.createElement("td");
        var tdInfoNome = document.createElement("td");
        var tdInfoFaceMatch = document.createElement("td");

        tdInfoNome.textContent = dados.nome;
        tdInfoFaceMatch.textContent = dados.faceMatch;
        tdInfoFoto = document.createElement("img");
        tdInfoFoto.height = 400;
        tdInfoFoto.width = 400;
        tdInfoFoto.src = "https://s3.amazonaws.com/bernardo-imagens/" + dados.nome + ".png";

        trTabela.appendChild(tdInfoFoto);
        trTabela.appendChild(tdInfoNome);
        trTabela.appendChild(tdInfoFaceMatch);

        var tabela1 = document.querySelector("#tabela-site1");

        tabela1.appendChild(trTabela);
      }
    }
  }