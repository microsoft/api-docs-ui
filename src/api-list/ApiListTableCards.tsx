import * as React from "react";
import { useState } from "react";
import { Stack } from "@fluentui/react";
import { Spinner } from "@fluentui/react-components";
import * as Constants from "../constants";
import { ApisTable } from "./ApisTable";
import { ApisCards } from "./ApisCards";
import { TApiListRuntimeFCProps } from "./ApiList";
import { FiltersPosition, TApisData, TLayout } from "../types";
import { TableFiltersSidebar, TFilterActive } from "../utils/TableFilters";
import { useTableFiltersTags } from "../utils/useTableFiltersTags";
import { TableListInfo } from "../utils/TableListInfo";
import { Pagination } from "../utils/Pagination";
import { TagService } from '../data/tagService';

type TApiListTableCards = TApiListRuntimeFCProps & {
    tagService: TagService;
    working: boolean;
    apis: TApisData;
    statePageNumber: ReturnType<typeof useState<number>>;
    statePattern: ReturnType<typeof useState<string>>;
    stateFilters: ReturnType<typeof useState<TFilterActive>>;
    stateGroupByTag: ReturnType<typeof useState<boolean>>;
};

export const ApiListTableCards = ({
    tagService,
    layoutDefault,
    getReferenceUrl,
    showApiType,
    allowViewSwitching,
    filtersPosition,
    detailsPageTarget,
    apis,
    working,
    statePageNumber: [pageNumber, setPageNumber],
    statePattern: [pattern, setPattern],
    stateFilters: [filters, setFilters],
    stateGroupByTag: [groupByTag, setGroupByTag],
}: TApiListTableCards) => {
    const [layout, setLayout] = useState<TLayout>(layoutDefault ?? TLayout.table);

    const filterOptionTags = useTableFiltersTags(tagService);

    const content = (
        <Stack tokens={{ childrenGap: "1rem" }}>
            <Stack.Item>
                <TableListInfo
                    layout={layout}
                    setLayout={setLayout}
                    pattern={pattern}
                    setPattern={setPattern}
                    filters={filters}
                    setFilters={setFilters}
                    filtersOptions={filtersPosition === FiltersPosition.popup ? [filterOptionTags] : undefined}
                    setGroupByTag={setGroupByTag} // don't allow grouping by tags when filtering for product APIs due to missing BE support
                    allowViewSwitching={allowViewSwitching}
                />
            </Stack.Item>

            {working || !apis ? (
                <Stack.Item>
                    <Spinner
                        label="Loading APIs"
                        labelPosition="below"
                        size="small"
                    />
                </Stack.Item>
            ) : (
                <>
                    <Stack.Item style={{ marginTop: "2rem" }}>
                        {layout === TLayout.table ? (
                            <ApisTable
                                apis={apis}
                                showApiType={showApiType}
                                getReferenceUrl={getReferenceUrl}
                                detailsPageTarget={detailsPageTarget}
                            />
                        ) : (
                            <ApisCards
                                apis={apis}
                                showApiType={showApiType}
                                getReferenceUrl={getReferenceUrl}
                                detailsPageTarget={detailsPageTarget}
                            />
                        )}
                    </Stack.Item>

                    <Stack.Item align={"center"}>
                        <Pagination
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                            pageMax={Math.ceil(apis?.count / Constants.defaultPageSize)}
                        />
                    </Stack.Item>
                </>
            )}
        </Stack>
    );

    return filtersPosition !== FiltersPosition.sidebar ? (
        content
    ) : (
        <Stack horizontal tokens={{ childrenGap: "2rem" }}>
            <Stack.Item
                shrink={0}
                style={{ minWidth: "12rem", width: "15%", maxWidth: "20rem" }}
            >
                <TableFiltersSidebar
                    filtersActive={filters}
                    setFiltersActive={setFilters}
                    filtersOptions={groupByTag ? [] : [filterOptionTags]}
                />
            </Stack.Item>
            <Stack.Item style={{ width: "100%" }}>{content}</Stack.Item>
        </Stack>
    );
};
