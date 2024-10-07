import { useGetMediaList } from 'src/api/backendServies';
import { EmptyContent } from 'src/components/empty-content';
import { MediaListHorizontal } from '../media-list-horizontal';

// ----------------------------------------------------------------------

export function MediaListView() {
  const { mediaList, mediaListLoading, mutate } = useGetMediaList();
  const notFound = !mediaList.length;
  return (
    <div className='mt-4'>
      {notFound && <EmptyContent filled sx={{ py: 10 }} />}
      <MediaListHorizontal mutate={mutate} posts={mediaList} loading={mediaListLoading} />
    </div>
  );
}
