import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';
const nation_url = 'https://data.covid19india.org/v4/min/data.min.json';

export const fetchData = async (country) => {
    let changableUrl = url;
    if (country) {
        changableUrl = `${url}/countries/${country}`
    }
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changableUrl);
        const modifiedData = { confirmed, recovered, deaths, lastUpdate }
        return modifiedData
    } catch (error) {

    }
}

export const fetchStateData = async () => {
    try {
        const { data } = await axios.get(nation_url);
        const andhraData = data['AP']['total'];
        const modifiedData = { lastUpdate: new Date(), active: { value: parseInt(andhraData.tested) }, confirmed: { value: parseInt(andhraData.confirmed) }, deaths: { value: parseInt(andhraData.deceased) }, recovered: { value: parseInt(andhraData.recovered) } }
        return modifiedData;
    } catch (error) {

    }
}

export const fetchDistrictData = async () => {
    try {
        const { data } = await axios.get(nation_url);
        const krishnaDistData = data['AP']['districts']['Krishna']['total'];
        const modifiedData = { lastUpdate: new Date(), active: { value: parseInt(krishnaDistData.tested) }, confirmed: { value: parseInt(krishnaDistData.confirmed) }, deaths: { value: parseInt(krishnaDistData.deceased) }, recovered: { value: parseInt(krishnaDistData.recovered) } }
        return modifiedData;
    } catch (error) {

    }
}


export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }))
        return modifiedData;
    } catch (error) {

    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);
        const modifiedData = countries.map((country) => country.name);
        return modifiedData;
    } catch (error) {

    }
}