class Calculator {

    static getHeightString(height) {
        const meterHeight = height / 10;
        const feetHeight = height / 3.048;
        const englishSystemFeetPart = Math.floor(feetHeight);
        const englishSystemInchPart = 12 * (feetHeight - englishSystemFeetPart);

        return `${englishSystemFeetPart}'${englishSystemInchPart.toFixed(1)}" (${meterHeight.toFixed(2)} m)`;
    }

    static getWeightString(weight) {
        const weightLbs = weight * 0.220462;
        const weightKgs = weight / 10;
        return `${(weightLbs).toFixed(1)} lbs (${(weightKgs).toFixed(1)} kg)`;
    }

    static getGenderRate(rate) {
        const chanceToBeFemale = rate/8*100;
        const chanceToBeMale = 100 - chanceToBeFemale;
        return [chanceToBeMale, chanceToBeFemale];
    }

    static statPercentageProgress(value) {
        return String(Math.round(value / 2.6)).concat('%');
    }
}