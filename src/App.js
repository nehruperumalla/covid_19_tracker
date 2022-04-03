import React from 'react';
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData, fetchStateData, fetchDistrictData } from './api';
import coronaImage from './images/covid.png';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
class App extends React.Component {
    state = {
        data: {},
        country: '',
        stateData: {},
        districtData: {},
        showLocalData: true
    }

    async componentDidMount() {
        const fetchedData = await fetchData();
        const fetchedStateData = await fetchStateData();
        const fetchedDistrictData = await fetchDistrictData();
        this.setState({ data: fetchedData, stateData: fetchedStateData, districtData: fetchedDistrictData });
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({ data: fetchedData, country: country });
    }

    handleDataChange = async (value) => {
        this.setState({ showLocalData: value })
    }

    render() {
        const { data, country, stateData, districtData, showLocalData } = this.state;
        const InternationalData = (<div className={styles.container}>
            <h1>World</h1>
            <Cards data={data} />
            <CountryPicker handleCountryChange={this.handleCountryChange} />
            <Chart data={data} country={country} />
        </div>);
        const LocalData = (<div className={styles.container}>
            <h1>Andhra Pradesh</h1>
            <Cards data={stateData} />
            <h1>Krishna District</h1>
            <Cards data={districtData} />
        </div>);
        return (
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID-19" />
                <ButtonGroup orientation='horizontal'>
                    <Button variant="contained" color="primary" onClick={() => this.handleDataChange(false)}>International</Button>
                    <Button variant="contained" color="primary" onClick={() => this.handleDataChange(true)}>Local</Button>
                </ButtonGroup>
                {showLocalData ? LocalData : InternationalData}

            </div>
        )
    }
}

export default App;
