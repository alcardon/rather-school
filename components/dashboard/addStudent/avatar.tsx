"use client"
import React, { useEffect, useState } from 'react'
import { Database } from '@/lib/database.types'

type Profiles = Database['public']['Tables']['profiles']['Row']
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Avatar({

  url,
  size,
  onUpload,
}: {
  uid: string
  url: Profiles['avatar_url']
  size: number
  onUpload: (url: string) => void
}) {
  const supabase = useSupabaseClient()

  const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path)
        if (error) {
          throw error
        }
        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (url) downloadImage(url)
  }, [url, supabase.storage])

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${uid}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file, { upsert: true })

      if (uploadError) {
        console.error(uploadError)
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      alert('Error uploading avatar!')
      console.log(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      { avatarUrl ? (
        <img
          src={ avatarUrl }
          alt="Avatar"
          className="avatar image"
          style={ { height: size, width: size } }
        />
      ) : (
        <div className="avatar no-image" style={ { height: size, width: size } } />
      ) }
      <div className='flex flex-wrap justify-center px-3 py-4'>
        {/* S */ }
        {/* <label className="block mb-2 text-sm font-medium text-gray-900E" > {uploading ? 'Uploading ...' : 'Upload File'}</label> */ }
        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none " id="single" type="file" onChange={ uploadAvatar }
          disabled={ uploading } accept="image/*" />


        {/* <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        /> */}
      </div>
    </div>
  )
}