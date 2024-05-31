import { useRouter } from 'next/router';
import { useEffect } from 'react';

/**
 * redirect logic:
 *
 * 进入页面,如果不是sign,signup,resend, 则记录在session
 *
 * 注册结束时,重定向到signin因为我们需要让用户登录
 *
 * signin之后,查找session中的redirect path,如果没有,返回首页.
 *  */

const useRedirectPreparation = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  const noRecordList = ['/signup', '/signin', '/resend'];

  useEffect(() => {
    if (!noRecordList.includes(currentPath)) {
      sessionStorage.setItem('redirectPath', currentPath);
    }
  }, [router.query]);
};

export default useRedirectPreparation;
