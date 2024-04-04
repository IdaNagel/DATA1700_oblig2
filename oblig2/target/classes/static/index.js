function kjopBillett() { //har ikke med film da det ikke er mulig å ikke velge
    const innantall = $("#antall").val();
    const innfornavn = $("#fornavn").val();
    const innetternavn = $("#etternavn").val();
    const inntelefonnr = $("#telefonnr").val();
    const innepost = $("#epost").val();

    if (isNaN(innantall) || !innantall) {
        $("#feilantall").html("Skriv inn et antall");
        document.getElementById("feilantall").style.color = "red";
        //bruker document.getElementById fordi jeg fikk feilmeldinger med $("#")
    }
    if (!innfornavn) {
        $("#feilfornavn").html("Skriv inn et navn");
        document.getElementById("feilfornavn").style.color = "red";

    }
    if (!innetternavn) {
        $("#feiletternavn").html("Skriv inn et etternavn");
        document.getElementById("feiletternavn").style.color = "red";

    }
    if (isNaN(inntelefonnr) || !inntelefonnr) {
        $("#feiltelefonnr").html("Skriv inn et nummer");
        document.getElementById("feiltelefonnr").style.color = "red";
    }
    if (!gyldigEpost(innepost)) {
        $("#feilepost").html("Skriv inn en gyldig epost");
        document.getElementById("feilepost").style.color = "red";
    }

    //Har lagt inn mesteparten av koden i else, slik at den ikke realiseres før alt er riktig
    else {
        const billett = {
            film: $("#film").val(),
            antall: $("#antall").val(),
            fornavn: $("#fornavn").val(),
            etternavn: $("#etternavn").val(),
            telefonnr: $("#telefonnr").val(),
            epost: $("#epost").val()
        };

        $.post("/lagre", billett, function () {
            hentBilletter();
        });


        //Setter alle input-valuene til ingenting for å tømme boksene etter man har skrevet inn
        $("#film").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");

    }


    function gyldigEpost(epost) {
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(epost);
    }
}

function hentBilletter() {
    $.get("/hentBillett", function (data) {
        formaterData(data);
    });
}

function formaterData(billetter) {
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

function slettBilletter() {
    $.get("/slettBilletter", function () {
        hentBilletter();
    });
}