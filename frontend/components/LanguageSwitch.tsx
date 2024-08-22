import Link from 'next/link';
import { Group, Menu, Burger, UnstyledButton, rem, useMantineTheme } from '@mantine/core';
import { useRouter } from 'next/router';
import { AiOutlineGlobal } from "react-icons/ai";
import { useDisclosure } from '@mantine/hooks';

export default function LanguageSwitch() {
  const router = useRouter();
  const { pathname, query, asPath } = router
  const [opened, { toggle }] = useDisclosure(false);
  const languageList = { 'ja': '日本語', 'en': 'English' }

  const theme = useMantineTheme()
  return (
    <>
      <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      <Menu
        width={260}
        position="bottom-end"
        transitionProps={{ transition: 'pop-top-right' }}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton
          >
            <Group gap={10}>
              <AiOutlineGlobal
                style={{ width: rem(40), height: rem(40), color: theme.colors.gray[6] }}
              />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          {Object.entries(languageList).map(([key, value]) => (
            <Menu.Item
              key={key}
              component={Link}
              href={{ pathname, query }}
              as={asPath}
              locale={key}
              style={{ textAlign: 'center' }}
            >
              {value}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </>
  )
}