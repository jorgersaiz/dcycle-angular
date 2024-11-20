export interface CovidData {
    date: string;
    cases: number;
    deaths: number;
    tests: number;
}

export interface CovidResponse {
    data: DataInfo [];
    links: any;
    meta: any;
}

interface DataInfo {
    cases: DataObject;
    date: string;
    outcomes: Outcome;
    states: number;
    testing: DataObject;

}

interface DataObject {
    total: Total;
}

interface Total {
    calculated: Calculated;
    value: number;
}

interface Calculated {
    change_from_prior_day: number;
    population_percent: number;
    seven_day_change_percent: number;
}

interface Outcome {
    death: DataObject;
    hospitalized: any;
}