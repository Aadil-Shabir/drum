import React, { useState } from "react";
import { Typography, Input, Space, Select, Checkbox, Button, Form } from "antd";
import FilterTitle from "../../components/FilterTitle";
import { constituencies, localAuthorities } from "../../data";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import axios from "axios";

const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const propertyTypeOptions = ["bungalow", "flat", "house", "maisonette", "park home"];
const propertyTotalAreaOptions = [
    { label: "unknown", value: "unknown" },
    { label: "1-55m²", value: "s" },
    { label: "55-70m²", value: "m" },
    { label: "70-85m²", value: "l" },
    { label: "85-110m²", value: "xl" },
    { label: "110m²+", value: "xxl" },
];
const currentEnergyRatingOptions = [
    { text1: "(92+)", text2: "a", Width: "50%", color: "#008054" },
    { text1: "(81-91)", text2: "b", Width: "58%", color: "#19b459" },
    { text1: "(69-80)", text2: "c", Width: "66%", color: "#8dce46" },
    { text1: "(55-68)", text2: "d", Width: "74%", color: "#ffd500" },
    { text1: "(39-54)", text2: "e", Width: "82%", color: "#fcaa65" },
    { text1: "(21-38)", text2: "f", Width: "90%", color: "#ef8023" },
    { text1: "(1-20)", text2: "g", Width: "98%", color: "#e9153b" },
];
const months = [
    { label: "January", value: "1" },
    { label: "February", value: "2" },
    { label: "March", value: "3" },
    { label: "April", value: "4" },
    { label: "May", value: "5" },
    { label: "June", value: "6" },
    { label: "July", value: "7" },
    { label: "August", value: "8" },
    { label: "September", value: "9" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
];
const years = [
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
];

interface Data {
    rows: any;
}

interface FilterProps {
    data: Data | undefined;
    setData: React.Dispatch<React.SetStateAction<Data | undefined>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Filters: React.FC<FilterProps> = ({ data, setData, isLoading, setIsLoading }) => {
    const [propertyTypeCheckedList, setPropertyTypeCheckedList] = useState<CheckboxValueType[]>([]);
    const [propertyTotalAreaCheckedList, setPropertyTotalAreaCheckedList] = useState<CheckboxValueType[]>([]);
    const [form] = Form.useForm();

    const propertyTypeOnChange = (list: CheckboxValueType[]) => {
        setPropertyTypeCheckedList(list);
    };

    const propertyTotalAreaOnChange = (list: CheckboxValueType[]) => {
        setPropertyTotalAreaCheckedList(list);
    };

    const onFinish = async (values: any) => {
        // Handle form submission here with the 'values' object
        console.log("Received values:", values);

        let url = `https://epc.opendatacommunities.org/api/v1/domestic/search?address=${
            values.address || ""
        }&postcode=${values.postcode || ""}&local-authority=${values.localAuthority || ""}&constituency=${
            values.constituency || ""
        }&uprn=${values.uprn || ""}&from-year=${values.certificateLodgementDateFromYear || "2008"}&from-month=${
            values.certificateLodgementDateFromMonth || "4"
        }&to-year=${values.certificateLodgementDateToYear || "2023"}&to-month=${
            values.certificateLodgementDateToMonth || "12"
        }&size=1000`;

        // Check if propertyType is an array with values
        if (values.propertyType && values.propertyType.length > 0) {
            // If there is only one value, add it once
            if (values.propertyType.length === 1) {
                url += `&property-type=${values.propertyType[0]}`;
            } else {
                // If there are multiple values, add each one separately
                values.propertyType.forEach((type: any) => {
                    url += `&property-type=${type}`;
                });
            }
        } else {
            // If propertyType is an empty array or not defined, add an empty string
            url += `&property-type=`;
        }

        if (values.propertyTotalFloorArea && values.propertyTotalFloorArea.length > 0) {
            // If there is only one value, add it once
            if (values.propertyTotalFloorArea.length === 1) {
                url += `&floor-area=${values.propertyTotalFloorArea[0]}`;
            } else {
                // If there are multiple values, add each one separately
                values.propertyTotalFloorArea.forEach((type: any) => {
                    url += `&floor-area=${type}`;
                });
            }
        } else {
            // If floor-area is an empty array or not defined, add an empty string
            url += `&floor-area=`;
        }

        // Define an array to store the selected energy bands
        const energyBands = [];

        // Iterate through the currentEnergyRating properties
        for (let i = 0; i < 7; i++) {
            const key = `currentEnergyRating${i}`;
            if (values[key] === true) {
                // Add the corresponding letter ('a', 'b', etc.) to the energy bands array
                energyBands.push(String.fromCharCode(97 + i));
            }
        }

        // Add each energy band as a separate query parameter
        energyBands.forEach((band) => {
            url += `&energy-band=${band}`;
        });

        console.log(url);

        try {
            setIsLoading(true);
            const response = await axios.get(url, {
                headers: {
                    Accept: "application/json",
                    Authorization:
                        "Basic YWFkaWwuc2hhYmlyMTNAZ21haWwuY29tOjE2Y2E3MzAxZGM4ZjBmZDYzNzBlMTlhMjU0YWIyMGQxMmRjMGViYTU=",
                },
            });

            console.log({ response });
            if (!response.data) {
                console.error("Empty response from the server");
                setData(undefined);
                setIsLoading(false);
                return;
            }

            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <Form form={form} onFinish={onFinish}>
            <div style={{ width: "100%", padding: "0.5rem" }}>
                <FilterTitle>ADDRESS</FilterTitle>
                <Form.Item name="address" style={{ margin: 0 }}>
                    <TextArea placeholder="Type a full or partial address" rows={4} />
                </Form.Item>
                <Space direction="vertical" style={{ width: "100%" }}>
                    <Typography.Title style={{ margin: 0 }} level={4}>
                        postcode
                    </Typography.Title>
                    <Form.Item name="postcode" style={{ margin: 0 }}>
                        <Input size="large" placeholder="Postcode" />
                    </Form.Item>
                </Space>
                <FilterTitle>LOCAL GOVERNMENT</FilterTitle>
                <Space direction="vertical" style={{ width: "100%" }} size="small">
                    <Typography.Text style={{ margin: 0, fontWeight: "bold" }}>Local Authority</Typography.Text>
                    <Form.Item name="localAuthority" style={{ margin: 0 }}>
                        <Select
                            options={localAuthorities.map((item, index) => ({
                                value: item.description,
                                label: item.description,
                            }))}
                            style={{ width: "100%" }}
                            placeholder="Local Authority"
                            size="large"
                        />
                    </Form.Item>
                </Space>
                <Space direction="vertical" style={{ width: "100%", margin: "0.5rem 0rem" }} size="small">
                    <Typography.Text style={{ margin: 0, fontWeight: "bold" }}>Constituency</Typography.Text>
                    <Form.Item name="constituency" style={{ margin: 0 }}>
                        <Select
                            options={constituencies.map((item, index) => ({
                                value: item.description,
                                label: item.description,
                            }))}
                            style={{ width: "100%" }}
                            placeholder="Constituency"
                            size="large"
                        />
                    </Form.Item>
                </Space>
                <FilterTitle>UPRN</FilterTitle>
                <Form.Item name="uprn" style={{ margin: 0 }}>
                    <Input size="large" placeholder="Unique Property Reference Number" />
                </Form.Item>
                <FilterTitle>Property Type</FilterTitle>
                <Form.Item name="propertyType" style={{ margin: 0 }}>
                    <CheckboxGroup
                        options={propertyTypeOptions.map((option) => ({ label: option, value: option }))}
                        value={propertyTypeCheckedList}
                        onChange={propertyTypeOnChange}
                        style={{ flexDirection: "column" }}
                    />
                </Form.Item>
                <FilterTitle>Property Total Floor Area</FilterTitle>
                <Form.Item name="propertyTotalFloorArea" style={{ margin: 0 }}>
                    <CheckboxGroup
                        options={propertyTotalAreaOptions.map((option) => ({
                            label: option.label,
                            value: option.value,
                        }))}
                        value={propertyTotalAreaCheckedList}
                        onChange={propertyTotalAreaOnChange}
                        style={{ flexDirection: "column" }}
                    />
                </Form.Item>
                <FilterTitle>Current Energy Rating</FilterTitle>
                {currentEnergyRatingOptions.map((option, index) => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Form.Item
                            name={`currentEnergyRating${index}`}
                            valuePropName="checked"
                            style={{ margin: "0.25rem 0rem", width: "100%" }}
                            key={index}
                        >
                            <Checkbox
                                style={{
                                    background: option.color,
                                    padding: "0.25rem 0.5rem",
                                    margin: 0,
                                    width: option.Width,
                                }}
                                value={option.text2}
                            >
                                <Typography.Title style={{ margin: 0 }} level={5}>
                                    {option.text1}
                                </Typography.Title>
                            </Checkbox>
                        </Form.Item>
                        <Typography.Title style={{ margin: 0, color: "black", textTransform: "capitalize" }} level={5}>
                            {option.text2}
                        </Typography.Title>
                    </div>
                ))}
                <FilterTitle>CERTIFICATE LODGEMENT DATE</FilterTitle>
                <Space direction="vertical" style={{ width: "100%", margin: "0.5rem 0rem" }} size="small">
                    <Typography.Text style={{ margin: 0, fontWeight: "bold" }}>From</Typography.Text>
                    <Form.Item name="certificateLodgementDateFromMonth" style={{ margin: 0 }}>
                        <Select
                            options={months.map((item, index) => ({
                                value: item.value,
                                label: item.label,
                            }))}
                            style={{ width: "100%" }}
                            placeholder="Month"
                            size="large"
                            defaultValue="April"
                        />
                    </Form.Item>
                    <Form.Item name="certificateLodgementDateFromYear" style={{ margin: 0 }}>
                        <Select
                            options={years.map((item, index) => ({
                                value: item,
                                label: item,
                            }))}
                            style={{ width: "100%" }}
                            placeholder="Year"
                            size="large"
                            defaultValue="2008"
                        />
                    </Form.Item>
                </Space>
                <Space direction="vertical" style={{ width: "100%", margin: "0.5rem 0rem" }} size="small">
                    <Typography.Text style={{ margin: 0, fontWeight: "bold" }}>To</Typography.Text>
                    <Form.Item name="certificateLodgementDateToMonth" style={{ margin: 0 }}>
                        <Select
                            options={months.map((item, index) => ({
                                value: item.value,
                                label: item.label,
                            }))}
                            style={{ width: "100%" }}
                            placeholder="Month"
                            size="large"
                            defaultValue="December"
                        />
                    </Form.Item>
                    <Form.Item name="certificateLodgementDateToYear" style={{ margin: 0 }}>
                        <Select
                            options={years.map((item, index) => ({
                                value: item,
                                label: item,
                            }))}
                            style={{ width: "100%" }}
                            placeholder="Year"
                            size="large"
                            defaultValue="2023"
                        />
                    </Form.Item>
                </Space>
                <Button type="primary" htmlType="submit">
                    Search
                </Button>
            </div>
        </Form>
    );
};

export default Filters;
