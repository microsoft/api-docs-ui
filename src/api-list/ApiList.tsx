import * as React from "react";
import { useEffect, useState } from "react";
import { FluentProvider } from "@fluentui/react-components";
import { SearchQuery } from "../models/searchQuery";
import * as Constants from "../constants";
import type { ApiService } from "../data/apiService";
import type { TagService } from "../data/tagService";
import { ApiListTableCards } from "./ApiListTableCards";
import { FiltersPosition, TApisData, TLayout } from "../types";
import { useInjection } from 'inversify-react';

export interface ApiListProps {
    allowSelection?: boolean;
    allowViewSwitching?: boolean;
    filtersPosition?: FiltersPosition;
    showApiType?: boolean;
    defaultGroupByTagToEnabled?: boolean;
    detailsPageUrl: string;
    detailsPageTarget: string;
    layoutDefault: TLayout;
}

export type TApiListRuntimeFCProps = Omit<ApiListProps, "detailsPageUrl"> & {
    getReferenceUrl: (apiName: string) => string;
}


const loadApis = async (apiService: ApiService, query: SearchQuery, groupByTag?: boolean, productName?: string) => {
    let apis: TApisData;

    try {
        // if (groupByTag) {
        //     apis = await apiService.getApisByTags(query);
        // } else {
            apis = await apiService.getApis(query);
        // }
    } catch (error) {
        throw new Error(`Unable to load APIs. Error: ${error.message}`);
    }

    return apis;
}

const ApiList = ({ defaultGroupByTagToEnabled, layoutDefault, ...props }: TApiListRuntimeFCProps) => {
    const apiService = useInjection<ApiService>('apiService');
    const tagService = useInjection<TagService>('tagService');
    const [working, setWorking] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [apis, setApis] = useState<TApisData>();
    const [pattern, setPattern] = useState<string>();
    const [groupByTag, setGroupByTag] = useState(!!defaultGroupByTagToEnabled);
    const [filters, setFilters] = useState({tags: [] as string[]});

    /**
     * Loads page of APIs.
     */
    useEffect(() => {
        const query: SearchQuery = {
            pattern,
            tags: filters.tags.map(name => ({id: name, name})),
            skip: (pageNumber - 1) * Constants.defaultPageSize,
            take: Constants.defaultPageSize
        };

        setWorking(true);
        loadApis(apiService, query, groupByTag)
            .then(apis => setApis(apis))
            .finally(() => setWorking(false));
    }, [apiService, pageNumber, groupByTag, filters, pattern]);

    return (
      <FluentProvider theme={Constants.fuiTheme}>
        <ApiListTableCards
            {...props}
            tagService={tagService}
            layoutDefault={layoutDefault}
            working={working}
            apis={apis}
            statePageNumber={[pageNumber, setPageNumber]}
            statePattern={[pattern, setPattern]}
            stateFilters={[filters, setFilters]}
            stateGroupByTag={[groupByTag, setGroupByTag]}
        />
      </FluentProvider>
    );
}
