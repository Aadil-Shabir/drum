import React, { useEffect, useState } from "react";
import { Spin, Typography } from "antd";
import { useParams } from "react-router-dom";
import Title from "../../components/Title";
import DetailList from "./DetailList";
import axios from "axios";
import DomesticEPC from "./DomesticEPC";

const BuildingDetails: React.FC = () => {
    let { buildingId } = useParams();
    const [building, setBuilding] = useState<any>();
    const [recommendations, setRecommendations] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                fetch(`https://epc.opendatacommunities.org/api/v1/domestic/certificate/${buildingId}`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization:
                            "Basic YWFkaWwuc2hhYmlyMTNAZ21haWwuY29tOjE2Y2E3MzAxZGM4ZjBmZDYzNzBlMTlhMjU0YWIyMGQxMmRjMGViYTU=",
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setBuilding(data.rows[0]);
                        setIsLoading(false);
                    });
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(
                    `https://epc.opendatacommunities.org/api/v1/domestic/recommendations/${buildingId}`,
                    {
                        headers: {
                            Accept: "application/json",
                            Authorization:
                                "Basic YWFkaWwuc2hhYmlyMTNAZ21haWwuY29tOjE2Y2E3MzAxZGM4ZjBmZDYzNzBlMTlhMjU0YWIyMGQxMmRjMGViYTU=",
                        },
                    }
                );

                if (response.status === 404) {
                    console.log("Resource not found");
                } else if (response.data.rows.length > 0) {
                    setRecommendations(response.data.rows);
                } else {
                    console.log("Error fetching data");
                }
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const certificates = [
        { name: "LODGEMENT DATE", value: building && building["lodgement-date"] },
        { name: "CURRENT ENERGY RATING", value: building && building["current-energy-rating"] },
        { name: "POTENTIAL ENERGY RATING", value: building && building["potential-energy-rating"] },
        { name: "CURRENT ENERGY EFFICIENCY", value: building && building["current-energy-efficiency"] },
        { name: "POTENTIAL ENERGY EFFICIENCY", value: building && building["potential-energy-efficiency"] },
        { name: "PROPERTY TYPE", value: building && building["property-type"] },
        { name: "BUILT FORM", value: building && building["built-form"] },
        { name: "CONSTRUCTION AGE BAND", value: building && building["construction-age-band"] },
        { name: "TENURE", value: building && building.tenure },
    ];

    const location = [
        { name: "ADDRESS", value: building && building.address },
        { name: "POST TOWN", value: building && building.posttown },
        { name: "POSTCODE", value: building && building.postcode },
        { name: "COUNTY", value: building && building.county },
        { name: "LOCAL AUTHORITY", value: building && building["local-authority"] },
        { name: "CONSTITUENCY", value: building && building.constituency },
    ];

    const other = [
        { name: "LMK KEY", value: building && building["lmk-key"] },
        { name: "BUILDING REFERENCE NUMBER", value: building && building["building-reference-number"] },
        { name: "INSPECTION DATE", value: building && building["inspection-date"] },
        { name: "TRANSACTION TYPE", value: building && building["transaction-type"] },
        { name: "ENVIRONMENT IMPACT CURRENT", value: building && building["environment-impact-current"] },
        { name: "ENVIRONMENT IMPACT POTENTIAL", value: building && building["environment-impact-potential"] },
        { name: "ENERGY CONSUMPTION CURRENT", value: building && building["energy-consumption-current"] },
        { name: "ENERGY CONSUMPTION POTENTIAL", value: building && building["energy-consumption-potential"] },
        { name: "CO₂ EMISSIONS CURRENT", value: building && building["co2-emissions-current"] },

        { name: "CO₂ EMISS CURR PER FLOOR AREA", value: building && building["co2-emiss-curr-per-floor-area"] },
        { name: "CO₂ EMISSIONS POTENTIAL", value: building && building["co2-emissions-potential"] },
        { name: "LIGHTING COST CURRENT", value: building && building["lighting-cost-current"] },
        { name: "LIGHTING COST POTENTIAL", value: building && building["lighting-cost-potential"] },
        { name: "HEATING COST CURRENT", value: building && building["heating-cost-current"] },
        { name: "HEATING COST POTENTIAL", value: building && building["heating-cost-potential"] },
        { name: "HOT WATER COST CURRENT", value: building && building["hot-water-cost-current"] },
        { name: "HOT WATER COST POTENTIAL", value: building && building["hot-water-cost-potential"] },
        { name: "TOTAL FLOOR AREA", value: building && building["total-floor-area"] },

        { name: "ENERGY TARIFF", value: building && building["energy-tariff"] },
        { name: "MAINS GAS FLAG", value: building && building["mains-gas-flag"] },
        { name: "FLOOR LEVEL", value: building && building["floor-level"] },
        { name: "FLAT TOP STOREY", value: building && building["flat-top-storey"] },
        { name: "FLAT STOREY COUNT", value: building && building["flat-storey-count"] },
        { name: "MAIN HEATING CONTROLS", value: building && building["main-heating-controls"] },
        { name: "MULTI GLAZE PROPORTION", value: building && building["multi-glaze-proportion"] },
        { name: "GLAZED TYPE", value: building && building["glazed-type"] },
        { name: "GLAZED AREA", value: building && building["glazed-area"] },

        { name: "EXTENSION COUNT", value: building && building["extension-count"] },
        { name: "NUMBER HABITABLE ROOMS", value: building && building["number-habitable-rooms"] },
        { name: "NUMBER HEATED ROOMS", value: building && building["number-heated-rooms"] },
        { name: "LOW ENERGY LIGHTING", value: building && building["low-energy-lighting"] },
        { name: "NUMBER OPEN FIREPLACES", value: building && building["number-opne-fireplaces"] },
        { name: "HOTWATER DESCRIPTION", value: building && building["hotwater-description"] },
        { name: "HOT WATER ENERGY EFF", value: building && building["hot-water-energy-eff"] },
        { name: "HOT WATER ENV EFF", value: building && building["hot-water-env-eff"] },
        { name: "FLOOR DESCRIPTION", value: building && building["floor-description"] },

        { name: "FLOOR ENERGY EFF", value: building && building["floor-energy-eff"] },
        { name: "FLOOR ENV EFF", value: building && building["floor-env-eff"] },
        { name: "WINDOWS DESCRIPTION", value: building && building["windows-description"] },
        { name: "WINDOWS ENERGY EFF", value: building && building["windows-energy-eff"] },
        { name: "WINDOWS ENV EFF", value: building && building["windows-env-eff"] },
        { name: "WALLS DESCRIPTION", value: building && building["walls-description"] },
        { name: "WALLS ENERGY EFF", value: building && building["walls-energy-eff"] },
        { name: "WALLS ENV EFF", value: building && building["walls-env-eff"] },
        { name: "SECONDHEAT DESCRIPTION", value: building && building["secondheat-description"] },
        { name: "SHEATING ENERGY EFF", value: building && building["sheating-energy-eff"] },
        { name: "SHEATING ENV EFF", value: building && building["sheating-env-eff"] },
        { name: "ROOF DESCRIPTION", value: building && building["roof-description"] },
        { name: "ROOF ENERGY EFF", value: building && building["roof-energy-eff"] },
        { name: "ROOF ENV EFF", value: building && building["roof-env-eff"] },
        { name: "MAINHEAT DESCRIPTION", value: building && building["mainheat-description"] },
        { name: "MAINHEAT ENERGY EFF", value: building && building["mainheat-energy-eff"] },
        { name: "MAINHEAT ENV EFF", value: building && building["mainheat-env-eff"] },
        { name: "MAINHEATCONT DESCRIPTION", value: building && building["mainheat-description"] },

        { name: "MAINHEATC ENERGY EFF", value: building && building["mainheatc-energy-eff"] },
        { name: "MAINHEATC ENV EFF", value: building && building["mainheatc-env-eff"] },
        { name: "LIGHTING DESCRIPTION", value: building && building["lighting-description"] },
        { name: "LIGHTING ENERGY EFF", value: building && building["lighting-energy-eff"] },
        { name: "LIGHTING ENV EFF", value: building && building["lighting-env-eff"] },
        { name: "MAIN FUEL", value: building && building["main-fuel"] },
        { name: "WIND TURBINE COUNT", value: building && building["wind-turbine-count"] },
        { name: "HEAT LOSS CORRIDOR", value: building && building["heat-loss-corridor"] },
        { name: "UNHEATED CORRIDOR LENGTH", value: building && building["unheated-corridor-length"] },
        { name: "FLOOR HEIGHT", value: building && building["floor-height"] },
        { name: "PHOTO SUPPLY", value: building && building["photo-supply"] },
        { name: "SOLAR WATER HEATING FLAG", value: building && building["solar-water-heating-flag"] },
        { name: "MECHANICAL VENTILATION", value: building && building["mechanical-ventilation"] },
        { name: "LODGEMENT DATETIME", value: building && building["lodgement-datetime"] },
        { name: "FIXED LIGHTING OUTLETS COUNT", value: building && building["fixed-lighting-outlets-count"] },
        {
            name: "LOW ENERGY FIXED LIGHTING OUTLETS COUNT",
            value: building && building["low-energy-fixed-lighting-outlets-count"],
        },
        { name: "UPRN", value: building && building["uprn"] },
        { name: "UPRN SOURCE", value: building && building["uprn-source"] },
    ];

    const recommends = recommendations
        ? recommendations.map((item: any) => ({
              name: `${item["improvement-id-text"]} - ${item["improvement-descr-text"]}`,
              value: item["indicative-cost"],
          }))
        : [];

    return (
        <div>
            {isLoading ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    <Typography.Title level={2} style={{ margin: "0.25rem 0rem", fontWeight: "bold" }}>
                        {building && building.address}
                    </Typography.Title>
                    <Title>Domestic EPC</Title>
                    <DomesticEPC building={building} />
                    <Title>Certificate Details</Title>
                    <DetailList list={certificates} />
                    <Title>Location</Title>
                    <DetailList list={location} />
                    <Title>Other</Title>
                    <DetailList list={other} />
                    <Title>Recommendations</Title>
                    <DetailList recommendations={true} list={recommends} />
                </>
            )}
        </div>
    );
};

export default BuildingDetails;
