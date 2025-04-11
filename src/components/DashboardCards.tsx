'use client';

import Link from 'next/link';
import { FC } from 'react';
import { BarChart2, Users, Wallet, Building2, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

type DashboardCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  bgColor: string;
  textColor: string;
  href: string;
};

const dashboardData: DashboardCard[] = [
  {
    title: 'Analytics',
    description: 'View insights',
    icon: BarChart2,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
    href: '/dashboard/analytics',
  },
  {
    title: 'Users',
    description: 'Manage employees',
    icon: Users,
    bgColor: 'bg-green-100',
    textColor: 'text-green-600',
    href: '/employee',
  },
  {
    title: 'Payroll',
    description: 'Salary & slips',
    icon: Wallet,
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-600',
    href: '/payroll',
  },
  {
    title: 'Offices',
    description: 'Branch locations',
    icon: Building2,
    bgColor: 'bg-red-100',
    textColor: 'text-red-600',
    href: '/office',
  },
];

const DashboardCards: FC = () => {
  return (
    <div className='mt-4 p-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 rounded-md'>
      {dashboardData.map((item, index) => {
        const Icon = item.icon;
        return (
          <Link href={item.href} key={index}>
            <motion.div
              className='bg-white p-6 rounded-xl shadow-md border h-full flex flex-col justify-between hover:shadow-xl transition duration-300 ease-in-out cursor-pointer'
              whileHover={{ scale: 1.03, y: -2 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 15,
                delay: index * 0.1,
              }}
            >
              <div className='flex items-center gap-4'>
                <div
                  className={`${item.bgColor} p-3 rounded-full ${item.textColor}`}
                >
                  <Icon className='w-6 h-6' />
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-gray-800'>
                    {item.title}
                  </h3>
                  <p className='text-sm text-gray-500'>{item.description}</p>
                </div>
              </div>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
};

export default DashboardCards;
