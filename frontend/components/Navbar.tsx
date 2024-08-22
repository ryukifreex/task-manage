import {
  Container,
  Group,
  Tabs,
} from '@mantine/core';
import Link from 'next/link';
import LanguageSwitch from './LanguageSwitch';

export default function Navbar() {
  const tabs = [
    // { title: 'add', link: }
    { title: 'Home', link: '/' },
    { title: 'TEST', link: '/create-task' },
  ]

  const items = tabs.map((tab) => (
    <Link href={tab.link} >
      <Tabs.Tab value={tab.title} key={tab.title}>
        {tab.title}
      </Tabs.Tab>
    </Link>
  ));

  return (
    <>
      <Container size="md">
        <Group justify="flex-end">
          <LanguageSwitch />
        </Group>
      </Container>
      <Container size="md">
        <Tabs
          defaultValue="Home"
          variant="outline"
          visibleFrom="sm"
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
      </Container>
    </>
  );
}