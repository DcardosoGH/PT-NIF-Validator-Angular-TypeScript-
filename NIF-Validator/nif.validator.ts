
import { AbstractControl } from '@angular/forms';

export function nifValidator(nif:AbstractControl) {
    let error: boolean = false;
    let testNr = nif.value;

    // Validations for initial digits

    if (
        testNr.substr(0, 1) != '1' && // pessoa singular 
        testNr.substr(0, 1) != '2' && // pessoa singular
        testNr.substr(0, 1) != '3' && // pessoa singular
        testNr.substr(0, 2) != '45' && // pessoa singular não residente
        testNr.substr(0, 1) != '5' && // pessoa colectiva
        testNr.substr(0, 1) != '6' && // administração pública
        testNr.substr(0, 2) != '70' && // herança indivisa
        testNr.substr(0, 2) != '71' && // pessoa colectiva não residente
        testNr.substr(0, 2) != '72' && // fundos de investimento
        testNr.substr(0, 2) != '77' && // atribuição oficiosa
        testNr.substr(0, 2) != '79' && // regime excepcional
        testNr.substr(0, 1) != '8' && // empresário em nome individual (extinto)
        testNr.substr(0, 2) != '90' && // condominios e sociedades irregulares
        testNr.substr(0, 2) != '91' && // condominios e sociedades irregulares
        testNr.substr(0, 2) != '98' && // não residentes
        testNr.substr(0, 2) != '99' // sociedades civis

    ) { error = true; }


    // Loop through the first 8 digits and multiply them by the oposite number (pos 0*9)(pos 1*8)...
    // Assign the values to an array 'totals'
    const totals = [];
    var j = 9;
    for(let i = 0; i < 8; i++) {
        totals[i] = testNr.substr(i, 1) * j;
        j--;
    }   
    
    // Sum of the all the values inside 'totals' array
    const reducer = (acc, curr) => acc + curr;
    const total = totals.reduce(reducer);

    // Final Calculations
    // Check the Mod 11 of the sum. If it is 0 or 1 we have an exception
    // Else we subtract 11 of the Modulus value.
    let resto = total % 11;
    let comparador;
    if (resto == 1 || resto == 0) { comparador = 0; } // exception
    else { comparador = 11 - resto; }

    // Compare the last digit of the nif to the final modulus value.
    const ultimoDigito = testNr.substr(8, 1) * 1;
    if (ultimoDigito != comparador) { error = true;; }

    // error validation
    if (error) { 
        return {invalidNif : true};     
     }
    else{
        return null;
    }

}