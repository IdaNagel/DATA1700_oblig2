
function kjopBillett() {
    const film = $("#film").val;
    const santall = $("#antall").val;
    const fornavn = $("#fornavn").val;
    const etternavn = $("#etternavn").val;
    const stelefonnr = $("#telefonnr").val;
    const epost = $("#epost").val;

    const antall = Number(santall);
    const telefonnr = Number(stelefonnr);

    //bruker if-setninger for å påse at alle input-feltene er riktige
    if (isNaN(antall) || antall < 1) {
        document.getElementById("feilantall").innerHTML = "Må skrive noe inn i antall";
        document.getElementById("feilantall").style.color="red";
    }
    if (isNaN(telefonnr) || telefonnr < 1) {
        document.getElementById("feiltelefonnr").innerHTML = "Må skrive inn tall i telefonnummer"
        document.getElementById("feiltelefonnr").style.color="red";
    }
    if (fornavn.length == 0) {
        document.getElementById("feilfornavn").innerHTML = "Må skrive noe inn i fornavn";
        document.getElementById("feilfornavn").style.color="red";
    }
    if (etternavn.length == 0) {
        document.getElementById("feiletternavn").innerHTML = "Må skrive noe inn i etternavn";
        document.getElementById("feiletternavn").style.color="red";
    }
    if (epost.length == 0) {
        document.getElementById("feilepost").innerHTML = "Må skrive noe inn i epost";
        document.getElementById("feilepost").style.color="red";
    }
    else {
        const billett = {
            film: film,
            antall: antall,
            fornavn: fornavn,
            etternavn: etternavn,
            telefonnr: telefonnr,
            epost: epost

        }
    }

        $.post("/lagre",billett, function (){
            hentBillett();
        });

        //Setter alle input-valuene til ingenting for å tømme boksene etter man har skrevet inn
        $("#film").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");

    }

    function hentBilletter(){
        $.get("/hentBillett", function (data){
            formaterData();
        });
    }


    function formaterData(billetter){
        let ut = "<table><tr>" +
            "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnummer</th><th>Epost</th>" +
            "</tr>";
        for (let b of billetter) {
            ut += "<tr>";
            ut += "<td>" + b.film + "</td><td>" + b.antall + "</td><td>" + b.fornavn + "</td><td>" + b.etternavn + "</td><td>" + b.telefonnr +
                "</td><td>" + b.epost + "</td>";
            ut += "</tr>";
    }
        ut += "</table>";
        $("#allebilletter").html(ut);


    }


function slettBilletter(){
    $.get("/slettBilletter", function (){
        hentBilletter();
    });
}