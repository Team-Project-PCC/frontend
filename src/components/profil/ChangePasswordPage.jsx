"use client";

export default function ChangePasswordPage({ password, onChange }) {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Ganti Password</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block">Password Lama</label>
                    <input
                        type="password"
                        name="old"
                        value={password.old}
                        onChange={onChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block">Password Baru</label>
                    <input
                        type="password"
                        name="new"
                        value={password.new}
                        onChange={onChange}
                        className="border p-2 w-full"
                    />
                </div>
            </div>
            <button className="bg-red-500 text-white px-6 py-2 rounded mt-6">
                Ubah Password
            </button>
        </div>
    );
}
