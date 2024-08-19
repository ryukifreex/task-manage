import Link from 'next/link';
import { Button, Group } from '@mantine/core';
import { useRouter } from 'next/router';

export default function LanguageSwitch() {
  const router = useRouter();
  const locale = router.locale
  const path = router.pathname
  const switchedLocale = locale === 'ja' ? 'en' : 'ja';

  return (
  <Group>
    <Link href={path} locale={switchedLocale}>
      <Button>{`言語を ${switchedLocale} に変更する`}</Button>
    </Link>
    </Group>
  );
};