import type { JSX } from 'react'
import { Switch } from '@/ui/switch'

export default function Page(): JSX.Element {
  return (
    <div className='h-full min-h-full w-full flex flex-col'>
      <div className='mb-3'>
        <p className='text-2xl capitalize font-semibold'>integrations</p>
        <p className='text-sm first-letter:capitalize mt-1 text-content-prompt'>integrate with your favorite tools and services.</p>
      </div>

      <div className='grid grid-cols-3 gap-4'>
        {tools.map((integration, index) => (
          <button
            key={index}
            disabled={integration.isItemDisabled}
            title={integration.isItemDisabled ? 'Feature currently being developed and not fully integrated.' : undefined}
            className='bg-primary-white border-[2px] border-gray-225 overflow-hidden rounded p-4 select-none relative disabled:opacity-65'>
            {integration.isItemDisabled && <div className='top-0 left-0 z-10 absolute w-full h-full bg-gray-400/10' />}
            <div className='w-full flex items-center justify-between mb-4'>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={integration.icon} alt={integration.name} className='w-16 h-16' />
              </div>
              <div>
                <Switch key={index} label={''} defaultChecked={integration.status} disabled={!integration.mutable} />
              </div>
            </div>
            <div className='flex flex-col items-start'>
              <p className='text-lg text-start font-semibold capitalize'>{integration.name}</p>
              <p className='text-sm text-start text-content-prompt'>{integration.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

const tools: ToolIntegrationType[] = [
  {
    name: 'outlook',
    icon: 'https://cdn.icon-icons.com/icons2/3053/PNG/512/microsoft_outlook_alt_macos_bigsur_icon_189969.png',
    description: 'Integrate with Microsoft Outlook to send and receive emails in the notifications center.',
    status: false,
    isItemDisabled: true,
    mutable: true,
  },
  {
    name: 'calendar',
    icon: 'https://cdn.icon-icons.com/icons2/3053/PNG/512/calendar_macos_bigsur_icon_189482.png',
    description: 'Integrate with Microsoft Calendar to view the events and program in the calendar center.',
    status: true,
    isItemDisabled: false,
    mutable: false,
  },
  {
    name: 'Teams',
    icon: 'https://cdn.icon-icons.com/icons2/3053/PNG/512/microsoft_teams_alt_macos_bigsur_icon_189961.png',
    description: 'Integrate with Microsoft Teams to chat and collaborate with your team members.',
    status: false,
    isItemDisabled: true,
    mutable: true,
  },
  {
    name: 'Slack',
    icon: 'https://cdn.icon-icons.com/icons2/3053/PNG/512/slack_macos_bigsur_icon_189725.png',
    description: 'Integrate with Slack to chat and collaborate with your team members.',
    status: false,
    isItemDisabled: true,
    mutable: true,
  },
  {
    name: 'one drive',
    icon: 'https://cdn.icon-icons.com/icons2/3053/PNG/512/microsoft_onedrive_alt_macos_bigsur_icon_189975.png',
    description: 'Integrate with Microsoft One Drive to store and manage your files and documents.',
    status: false,
    isItemDisabled: true,
    mutable: true,
  },
  {
    name: 'notion',
    icon: 'https://cdn.icon-icons.com/icons2/3053/PNG/512/notion_alt_macos_bigsur_icon_189899.png',
    description: 'Integrate with Notion to manage your notes and observation in the workspace.',
    status: false,
    isItemDisabled: true,
    mutable: true,
  },
  {
    name: 'sharepoint',
    icon: 'https://cdn.icon-icons.com/icons2/3053/PNG/512/microsoft_sharepoint_alt_macos_bigsur_icon_189964.png',
    description: 'Integrate with Microsoft Share Point to share and manage your files and documents.',
    status: false,
    isItemDisabled: true,
    mutable: true,
  },
  {
    name: 'excel',
    icon: 'https://cdn.icon-icons.com/icons2/3053/PNG/512/microsoft_excel_macos_bigsur_icon_189980.png',
    description: 'Integrate with Microsoft Excel to view and manage your data and information.',
    status: false,
    isItemDisabled: true,
    mutable: true,
  },
]
