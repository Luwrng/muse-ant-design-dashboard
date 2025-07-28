import React, { useEffect, useState } from "react";
import axios from "axios";

function AddressSelector({ onChange, initialValue = {} }) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(initialValue.provinceCode || "");
  const [selectedDistrict, setSelectedDistrict] = useState(initialValue.districtCode || "");
  const [selectedWard, setSelectedWard] = useState(initialValue.wardCode || "");

  useEffect(() => {
    axios.get("https://provinces.open-api.vn/api/p/").then((res) => {
      setProvinces(res.data);
    });
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      axios
        .get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
        .then((res) => {
          setDistricts(res.data.districts);
          setSelectedDistrict("");
          setWards([]);
          setSelectedWard("");
        });
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      axios
        .get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
        .then((res) => {
          setWards(res.data.wards);
          setSelectedWard("");
        });
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedProvince && selectedDistrict && selectedWard) {
      const province = provinces.find((p) => p.code === selectedProvince);
      const district = districts.find((d) => d.code === selectedDistrict);
      const ward = wards.find((w) => w.code === selectedWard);

      onChange &&
        onChange({
          province: province?.name || "",
          provinceCode: province?.code || "",
          district: district?.name || "",
          districtCode: district?.code || "",
          ward: ward?.name || "",
          wardCode: ward?.code || "",
        });
    }
  }, [selectedProvince, selectedDistrict, selectedWard]);

  return (
    <div className="address-selector">
      <label>Tỉnh / Thành phố</label>
      <select
        className="siup-input-field"
        value={selectedProvince}
        onChange={(e) => setSelectedProvince(e.target.value)}
      >
        <option value="">-- Chọn tỉnh/thành --</option>
        {provinces.map((p) => (
          <option key={p.code} value={p.code}>
            {p.name}
          </option>
        ))}
      </select>

      <label>Quận / Huyện</label>
      <select
        className="siup-input-field"
        value={selectedDistrict}
        onChange={(e) => setSelectedDistrict(e.target.value)}
        disabled={!selectedProvince}
      >
        <option value="">-- Chọn quận/huyện --</option>
        {districts.map((d) => (
          <option key={d.code} value={d.code}>
            {d.name}
          </option>
        ))}
      </select>

      <label>Phường / Xã</label>
      <select
        className="siup-input-field"
        value={selectedWard}
        onChange={(e) => setSelectedWard(e.target.value)}
        disabled={!selectedDistrict}
      >
        <option value="">-- Chọn phường/xã --</option>
        {wards.map((w) => (
          <option key={w.code} value={w.code}>
            {w.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AddressSelector;
