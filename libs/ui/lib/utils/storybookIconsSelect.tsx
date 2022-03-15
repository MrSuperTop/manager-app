import { AdjustmentsIcon, ArchiveIcon, BanIcon, SearchIcon } from '@heroicons/react/outline';

const iconsSelectList = {
  BanIcon: <BanIcon />,
  AdjustmentsIcon: <AdjustmentsIcon />,
  ArchiveIcon: <ArchiveIcon />,
  SearchIcon: <SearchIcon />
};

export const defaultIcon = <AdjustmentsIcon />;

export const getIconSelect = (
  description: string
) => {
  return {
    options: Object.keys(iconsSelectList),
    mapping: iconsSelectList,
    control: {
      type: 'select',
      labels: {
        BanIcon: 'Ban',
        AdjustmentsIcon: 'Settings',
        ArchiveIcon: 'Archive',
        SearchIcon: 'Search'
      }
    },
    description: description
  };
};
