import XMark from '@/icons/XMark'
import { useSearchPanelStore } from '@/store/search-panel'
import { User } from '@/types'
import { getUsers } from '@/utils/api/userApi'
import React from 'react'
import UserCard from './UserCard'
import Loading from '../UI/Loading'
import { useConversationStore } from '@/store/conversation'
import { useMessageStore } from '@/store/messages'
import { getMessagesApi } from '@/utils/api/messagesApi'

type Props = {
  isOpen: boolean
}

interface UserSearch {

}

const SearchPanel = ({ isOpen }: Props) => {
  const { setSearchPanelStatus } = useSearchPanelStore((state) => state)
  const [searchQuery, setSearchQuery] = React.useState<string>('')
  const [userSearch, setUserSearch] = React.useState<User[] | []>([])
  const [loading, setLoading] = React.useState(false);
  const {
    conversationLoadingAction,
    setSelectedConversation
  } = useConversationStore((state) => state)
  const { setMessage } = useMessageStore((state) => state);

  const searchInputOnChange = async (e: any) => {
    setSearchQuery(e.target.value)
  }

  const resetQuery = async () => {
    setUserSearch([])
    setSearchQuery('')
  }

  const onSearchUser = async () => {
    setLoading(true)
    const res = await getUsers(searchQuery)

    setUserSearch(res)
    setLoading(false)
  }

  const panelOnClick = async (data: any) => {
    conversationLoadingAction();

    const dataConversation = {
      name: data.fullname,
      friendId: data._id,
      friendAvatar: data.avatar,
    };

    setSelectedConversation(dataConversation);

    const res = await getMessagesApi(data._id);
    setMessage(res?.data.data);
    conversationLoadingAction();
    resetQuery()
    setSearchPanelStatus(false)
  };

  React.useEffect(() => {
    if (searchQuery.length > 2) {
      onSearchUser()
    } else {
      setUserSearch([])
    }
  }, [searchQuery]);

  React.useEffect(() => {
    resetQuery()
  }, [isOpen]);

  const renderSearchUser = () => {
    if (loading) return (
      <div className='flex flex-col justify-center items-center w-full h-full'>
        <Loading />
      </div>
    );
    return (
      <div>
        {
          userSearch.length > 0 ?
            userSearch.map((data, i) => {
              return (
                <UserCard
                  key={i}
                  name={data.fullname}
                  image={data.avatar}
                  onPress={() => panelOnClick(data)}
                />
              );
            })
            :
            <span className='self-center'>
              No Result
            </span>
        }
      </div>
    );
  };

  return (
    <div className={`absolute ${!isOpen ? 'hidden' : ''} h-full w-[440px] border-r-[1px] bg-[#111B21] border-gray-700 z-10 p-2`}>
      <div className='flex justify-end cursor-pointer hover:bg-opacity-15' onClick={() => setSearchPanelStatus(false)}>
        <XMark size={30} />
      </div>

      <div className='p-2 space-y-4'>
        {/* Search */}
        <div className="flex flex-col w-full my-1">
          <input type="text" onChange={(e) => searchInputOnChange(e)} className="w-full px-2 py-2 text-sm rounded bg-[#202C33] outline-none" placeholder="Search by email or username" value={searchQuery} />
        </div>
        <div className='flex flex-col space-y-2'>
          {renderSearchUser()}
        </div>
      </div>
    </div>
  )
}

export default SearchPanel