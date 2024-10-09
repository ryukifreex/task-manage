import { Button, Dropdown, MenuProps, Space } from 'antd'
import { AiOutlineGlobal } from 'react-icons/ai'
import { useRouter } from 'next/router'
import i18n from '../i18n'

export default function LanguageSwitch() {
  const router = useRouter()
  const { pathname, query, asPath } = router
  const languageList = [
    { value: 'ja', label: '日本語' },
    { value: 'en', label: 'English' },
  ]

  const handleSelect = (selectedLanguage) => {
    i18n.changeLanguage(selectedLanguage)
  }

  const items: MenuProps['items'] = languageList.map((language) => ({
    key: language.value,
    label: (
      <Button
        type="text"
        onClick={() => {
          handleSelect(language.value)
          router.push({ pathname, query }, asPath, { locale: language.value })
        }}
      >
        {language.label}
      </Button>
    ),
  }))

  return (
    <Dropdown menu={{ items }} placement="bottomRight" arrow>
      <Button icon={<AiOutlineGlobal size={'40'} />} />
    </Dropdown>
  )
}
