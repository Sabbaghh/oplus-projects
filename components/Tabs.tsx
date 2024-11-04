'use client';
import React, { useState, useEffect } from 'react';
import TextRegular from '@/components/text/TextRegular';
import { useSearchParams } from 'next/navigation';
import useQueryParams from '@/components/ProjectsPage/useQueryParams';
import {
  PROJECT_TYPE_ALL,
  PROJECT_TYPE_EVENTS,
  PROJECT_TYPE_EXHIBITION,
} from '@/constants/ProjectTypes';
function Tabs() {
  const { replaceQueryParams } = useQueryParams();
  const [tabs, toggleTabs] = useState({
    tabs: [
      {
        tabName: 'All',
        queryValue: PROJECT_TYPE_ALL,
      },
      {
        tabName: 'Events',
        queryValue: PROJECT_TYPE_EVENTS,
      },
      {
        tabName: 'Exhibition',
        queryValue: PROJECT_TYPE_EXHIBITION,
      },
    ],
    activeTab: 'All',
  });

  const searchParams = useSearchParams();
  useEffect(() => {
    const currentActiveQuery = searchParams.get('projectType') || 'All';
    toggleTabs({ ...tabs, activeTab: currentActiveQuery?.toString() });
  }, []);
  const trigggerTab = (queryValue: string) => {
    toggleTabs({ ...tabs, activeTab: queryValue });
    replaceQueryParams('projectType', queryValue);
  };
  return (
    <>
      {tabs.tabs.map(({ tabName, queryValue }) => {
        const isActive = queryValue === tabs.activeTab;
        return (
          <div
            onClick={() => trigggerTab(queryValue)}
            key={tabName}
            className={` justify-center rounded-3xl flex px-5 hover:border-opacity-1 hover:border-black transition-all ease-out duration-300 hover:duration-300 border-2 cursor-pointer py-1  hover:text-black ${
              isActive
                ? ' border-black text-black'
                : 'text-muted-foreground border-opacity-0'
            } `}
          >
            <TextRegular size="small" className={`text-center self-center  `}>
              {tabName}
            </TextRegular>
          </div>
        );
      })}
    </>
  );
}

export default Tabs;
