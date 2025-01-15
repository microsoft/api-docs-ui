import { TagGroup } from '@/types/common';

export function isTagGroupedList<T extends object>(list?: T[] | Array<TagGroup<T>>): list is Array<TagGroup<T>> {
  if (!list || !list.length) {
    return false;
  }

  return 'tag' in list[0] && 'items' in list[0];
}
