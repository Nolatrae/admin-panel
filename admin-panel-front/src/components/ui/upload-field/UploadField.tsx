import { CSSProperties, FC } from 'react'

import { SERVER_URL } from '@/constants/main.constants'
import { FieldError } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'
import { useUpload } from './useUpload'

interface IUploadField {
	folder?: string
	value?: string
	onChange: (...event: any[]) => void
	placeholder: string
	error?: FieldError
	style?: CSSProperties
	isNoImage?: boolean
}

const UploadField: FC<IUploadField> = ({
	onChange,
	placeholder,
	error,
	folder,
	isNoImage = false,
	style,
	value,
}) => {
	const { isLoading, uploadFile } = useUpload(onChange, folder)

	return (
		<div style={style}>
			<div>
				<label>
					<div className='mb-2'>{placeholder}</div>
					<input type='file' onChange={uploadFile} />
					{error && <div className='text-red'>{error.message}</div>}
				</label>

				{!isNoImage && (
					<div>
						{isLoading ? (
							<Skeleton count={1} className='w-full h-full' />
						) : (
							value && (
								<img
									alt=''
									className='rounded-md mt-3'
									src={value.includes('http') ? value : SERVER_URL + value}
									width={100}
									height={100}
								/>
							)
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default UploadField
